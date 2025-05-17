
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NodeCategory } from './NodeTypes';
import { Check, Plus, X } from 'lucide-react';

interface NodeCatalogProps {
  categories: NodeCategory[];
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

const NodeCatalog: React.FC<NodeCatalogProps> = ({ categories, onDragStart }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredCategories = React.useMemo(() => {
    if (!searchQuery) return categories;
    
    return categories.map(category => ({
      ...category,
      nodes: category.nodes.filter(node => 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.nodes.length > 0);
  }, [categories, searchQuery]);
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Node Catalog</CardTitle>
        <div className="pt-2">
          <Input 
            placeholder="Search nodes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-8 top-[5.25rem] text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue={categories[0]?.id} className="w-full">
          <TabsList className="w-full mb-2">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {filteredCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-2 mt-0">
              {category.nodes.map((node) => {
                const nodeTypeClass = `${node.nodeType}`;
                const icon = node.nodeType === 'trigger' ? <Check className="w-4 h-4" /> : 
                             node.nodeType === 'action' ? <Plus className="w-4 h-4" /> : 
                             null;

                return (
                  <div
                    key={`${category.id}-${node.label}`}
                    className={`node-drag ${nodeTypeClass} text-sm`}
                    onDragStart={(event) => onDragStart(event, JSON.stringify(node))}
                    draggable
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center
                        ${node.nodeType === 'trigger' ? 'text-workflow-node-trigger' : 
                          node.nodeType === 'action' ? 'text-workflow-node-action' :
                          'text-workflow-node-helper'}`}
                      >
                        {icon}
                      </div>
                      <span className="truncate">{node.label}</span>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NodeCatalog;
