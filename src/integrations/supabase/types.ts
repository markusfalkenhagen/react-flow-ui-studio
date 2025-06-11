export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_buttons: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
          webhook_url: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
          webhook_url: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          webhook_url?: string
        }
        Relationships: []
      }
      ai_providers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          all_day: boolean | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          location: string | null
          recurrence_pattern: Json | null
          recurring: boolean | null
          reminder: boolean | null
          reminder_time: unknown | null
          start_time: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          all_day?: boolean | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          recurrence_pattern?: Json | null
          recurring?: boolean | null
          reminder?: boolean | null
          reminder_time?: unknown | null
          start_time: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          all_day?: boolean | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          recurrence_pattern?: Json | null
          recurring?: boolean | null
          reminder?: boolean | null
          reminder_time?: unknown | null
          start_time?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string | null
          id: string
          sender: string
          status: string | null
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string | null
          id?: string
          sender: string
          status?: string | null
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string | null
          id?: string
          sender?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          current_step: number
          id: string
          is_completed: boolean
          metadata: Json | null
          session_type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_step?: number
          id?: string
          is_completed?: boolean
          metadata?: Json | null
          session_type?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_step?: number
          id?: string
          is_completed?: boolean
          metadata?: Json | null
          session_type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chats: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chats_old: {
        Row: {
          created_at: string
          id: string
          model_id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          model_id: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          model_id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      copywriting_results: {
        Row: {
          call_to_action: string | null
          content: string
          copy_type: string | null
          created_at: string | null
          id: string
          is_demo: boolean | null
          key_benefits: string | null
          product_service: string | null
          target_audience: string | null
          title: string | null
          tone: Database["public"]["Enums"]["story_tone"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          call_to_action?: string | null
          content: string
          copy_type?: string | null
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          key_benefits?: string | null
          product_service?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          call_to_action?: string | null
          content?: string
          copy_type?: string | null
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          key_benefits?: string | null
          product_service?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_contacted: string | null
          last_name: string
          notes: string | null
          phone: string | null
          position: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_contacted?: string | null
          last_name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_contacted?: string | null
          last_name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      design_assets: {
        Row: {
          asset_type: string
          canva_asset_id: string
          created_at: string | null
          design_id: string | null
          id: string
          metadata: Json | null
          name: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          asset_type: string
          canva_asset_id: string
          created_at?: string | null
          design_id?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          asset_type?: string
          canva_asset_id?: string
          created_at?: string | null
          design_id?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "design_assets_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
        ]
      }
      designs: {
        Row: {
          canva_design_id: string
          canva_urls: Json | null
          created_at: string | null
          design_type: string | null
          id: string
          metadata: Json | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          canva_design_id: string
          canva_urls?: Json | null
          created_at?: string | null
          design_type?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          canva_design_id?: string
          canva_urls?: Json | null
          created_at?: string | null
          design_type?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_workflows: {
        Row: {
          content: string
          created_at: string | null
          desired_tone: Database["public"]["Enums"]["story_tone"] | null
          email_content_pointers: string | null
          exclude_conditions: string | null
          id: string
          is_demo: boolean | null
          number_of_emails: number | null
          target_audience: string | null
          title: string
          trigger_event: string | null
          updated_at: string | null
          user_id: string | null
          workflow_goal: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          desired_tone?: Database["public"]["Enums"]["story_tone"] | null
          email_content_pointers?: string | null
          exclude_conditions?: string | null
          id?: string
          is_demo?: boolean | null
          number_of_emails?: number | null
          target_audience?: string | null
          title: string
          trigger_event?: string | null
          updated_at?: string | null
          user_id?: string | null
          workflow_goal?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          desired_tone?: Database["public"]["Enums"]["story_tone"] | null
          email_content_pointers?: string | null
          exclude_conditions?: string | null
          id?: string
          is_demo?: boolean | null
          number_of_emails?: number | null
          target_audience?: string | null
          title?: string
          trigger_event?: string | null
          updated_at?: string | null
          user_id?: string | null
          workflow_goal?: string | null
        }
        Relationships: []
      }
      faq_results: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_demo: boolean | null
          num_questions: number | null
          target_audience: string | null
          title: string | null
          tone: Database["public"]["Enums"]["story_tone"] | null
          topic: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          num_questions?: number | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          topic?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          num_questions?: number | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          topic?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      finance_results: {
        Row: {
          analysis_type: string | null
          content: string
          created_at: string | null
          currency: string | null
          id: string
          is_demo: boolean | null
          time_period: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis_type?: string | null
          content: string
          created_at?: string | null
          currency?: string | null
          id?: string
          is_demo?: boolean | null
          time_period?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_type?: string | null
          content?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          is_demo?: boolean | null
          time_period?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      funnel_results: {
        Row: {
          content: string
          conversion_goals: string | null
          created_at: string | null
          funnel_type: string | null
          id: string
          is_demo: boolean | null
          target_audience: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          conversion_goals?: string | null
          created_at?: string | null
          funnel_type?: string | null
          id?: string
          is_demo?: boolean | null
          target_audience?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          conversion_goals?: string | null
          created_at?: string | null
          funnel_type?: string | null
          id?: string
          is_demo?: boolean | null
          target_audience?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          created_at: string
          description: string | null
          gallery_id: string
          id: string
          metadata: Json | null
          storage_path: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          gallery_id: string
          id?: string
          metadata?: Json | null
          storage_path: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          gallery_id?: string
          id?: string
          metadata?: Json | null
          storage_path?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "image_galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_content: {
        Row: {
          content: string
          content_type: string
          created_at: string
          id: string
          input_data: Json | null
          provider: string
          sub_type: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          id?: string
          input_data?: Json | null
          provider: string
          sub_type?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          id?: string
          input_data?: Json | null
          provider?: string
          sub_type?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      generated_images: {
        Row: {
          base64_data: string
          created_at: string | null
          id: string
          is_demo: boolean | null
          prompt: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          base64_data: string
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          prompt: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          base64_data?: string
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          prompt?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      generated_stories: {
        Row: {
          brand_name: string | null
          brand_values: string | null
          content: string
          created_at: string | null
          desired_length: Database["public"]["Enums"]["story_length"] | null
          id: string
          is_demo: boolean | null
          num_variations: number | null
          story_tone: Database["public"]["Enums"]["story_tone"] | null
          story_type: Database["public"]["Enums"]["story_type"] | null
          target_audience: string | null
          title: string | null
          unique_selling_proposition: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          brand_name?: string | null
          brand_values?: string | null
          content: string
          created_at?: string | null
          desired_length?: Database["public"]["Enums"]["story_length"] | null
          id?: string
          is_demo?: boolean | null
          num_variations?: number | null
          story_tone?: Database["public"]["Enums"]["story_tone"] | null
          story_type?: Database["public"]["Enums"]["story_type"] | null
          target_audience?: string | null
          title?: string | null
          unique_selling_proposition?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          brand_name?: string | null
          brand_values?: string | null
          content?: string
          created_at?: string | null
          desired_length?: Database["public"]["Enums"]["story_length"] | null
          id?: string
          is_demo?: boolean | null
          num_variations?: number | null
          story_tone?: Database["public"]["Enums"]["story_tone"] | null
          story_type?: Database["public"]["Enums"]["story_type"] | null
          target_audience?: string | null
          title?: string | null
          unique_selling_proposition?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      generation_results: {
        Row: {
          created_at: string
          generated_output: Json | null
          id: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          generated_output?: Json | null
          id?: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          generated_output?: Json | null
          id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generation_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      hook_executions: {
        Row: {
          executed_at: string | null
          hook_id: string
          id: string
          response_data: Json | null
          response_status: number | null
          status: string
        }
        Insert: {
          executed_at?: string | null
          hook_id: string
          id?: string
          response_data?: Json | null
          response_status?: number | null
          status: string
        }
        Update: {
          executed_at?: string | null
          hook_id?: string
          id?: string
          response_data?: Json | null
          response_status?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "hook_executions_hook_id_fkey"
            columns: ["hook_id"]
            isOneToOne: false
            referencedRelation: "hooks"
            referencedColumns: ["id"]
          },
        ]
      }
      hooks: {
        Row: {
          active: boolean | null
          api_endpoint: string | null
          api_headers: Json | null
          api_key: string | null
          created_at: string | null
          description: string | null
          execution_count: number | null
          id: string
          name: string
          type: string
          updated_at: string | null
          user_id: string
          webhook_headers: Json | null
          webhook_method: string | null
          webhook_url: string | null
        }
        Insert: {
          active?: boolean | null
          api_endpoint?: string | null
          api_headers?: Json | null
          api_key?: string | null
          created_at?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          name: string
          type: string
          updated_at?: string | null
          user_id: string
          webhook_headers?: Json | null
          webhook_method?: string | null
          webhook_url?: string | null
        }
        Update: {
          active?: boolean | null
          api_endpoint?: string | null
          api_headers?: Json | null
          api_key?: string | null
          created_at?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string
          webhook_headers?: Json | null
          webhook_method?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      image_galleries: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      innovation_results: {
        Row: {
          content: string
          created_at: string | null
          id: string
          industry: string | null
          innovation_type: string | null
          is_demo: boolean | null
          target_market: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          industry?: string | null
          innovation_type?: string | null
          is_demo?: boolean | null
          target_market?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          industry?: string | null
          innovation_type?: string | null
          is_demo?: boolean | null
          target_market?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_bot_sessions: {
        Row: {
          context_data: Json | null
          created_at: string | null
          id: string
          is_demo: boolean | null
          messages: Json
          session_title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context_data?: Json | null
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          messages: Json
          session_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context_data?: Json | null
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          messages?: Json
          session_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          size: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          size?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          size?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lead_searches: {
        Row: {
          company_size: string | null
          created_at: string | null
          exclude_domains: string[] | null
          id: string
          include_linkedin: boolean | null
          include_phone: boolean | null
          include_website: boolean | null
          industry: string | null
          location: string | null
          positions: string[] | null
          progress: number | null
          query: string | null
          results: number | null
          results_url: string | null
          status: string
          updated_at: string | null
          user_id: string
          verify_emails: boolean | null
        }
        Insert: {
          company_size?: string | null
          created_at?: string | null
          exclude_domains?: string[] | null
          id?: string
          include_linkedin?: boolean | null
          include_phone?: boolean | null
          include_website?: boolean | null
          industry?: string | null
          location?: string | null
          positions?: string[] | null
          progress?: number | null
          query?: string | null
          results?: number | null
          results_url?: string | null
          status: string
          updated_at?: string | null
          user_id: string
          verify_emails?: boolean | null
        }
        Update: {
          company_size?: string | null
          created_at?: string | null
          exclude_domains?: string[] | null
          id?: string
          include_linkedin?: boolean | null
          include_phone?: boolean | null
          include_website?: boolean | null
          industry?: string | null
          location?: string | null
          positions?: string[] | null
          progress?: number | null
          query?: string | null
          results?: number | null
          results_url?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
          verify_emails?: boolean | null
        }
        Relationships: []
      }
      meeting_summaries: {
        Row: {
          action_items: string | null
          content: string
          created_at: string | null
          id: string
          is_demo: boolean | null
          key_decisions: string | null
          meeting_date: string | null
          meeting_transcript: string | null
          participants: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action_items?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          key_decisions?: string | null
          meeting_date?: string | null
          meeting_transcript?: string | null
          participants?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_items?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_demo?: boolean | null
          key_decisions?: string | null
          meeting_date?: string | null
          meeting_transcript?: string | null
          participants?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats_old"
            referencedColumns: ["id"]
          },
        ]
      }
      naming_results: {
        Row: {
          content: string
          created_at: string | null
          id: string
          industry: string | null
          is_demo: boolean | null
          keywords: string[] | null
          naming_type: string | null
          target_audience: string | null
          title: string | null
          tone: Database["public"]["Enums"]["story_tone"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          industry?: string | null
          is_demo?: boolean | null
          keywords?: string[] | null
          naming_type?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          industry?: string | null
          is_demo?: boolean | null
          keywords?: string[] | null
          naming_type?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      onboarding_responses: {
        Row: {
          answer: string
          created_at: string
          id: string
          question_id: string
          question_text: string
          step_number: number
          updated_at: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question_id: string
          question_text: string
          step_number: number
          updated_at?: string
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question_id?: string
          question_text?: string
          step_number?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      personal_heroes: {
        Row: {
          created_at: string
          html_content: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          seo_keywords: string[] | null
          seo_meta_description: string | null
          seo_status: Database["public"]["Enums"]["seo_status_enum"]
          seo_title: string | null
          slug: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_keywords?: string[] | null
          seo_meta_description?: string | null
          seo_status?: Database["public"]["Enums"]["seo_status_enum"]
          seo_title?: string | null
          slug?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_keywords?: string[] | null
          seo_meta_description?: string | null
          seo_status?: Database["public"]["Enums"]["seo_status_enum"]
          seo_title?: string | null
          slug?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      predefined_prompts: {
        Row: {
          created_at: string
          id: string
          name: string
          template: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          template: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          template?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          canva_team_id: string | null
          canva_user_id: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          canva_team_id?: string | null
          canva_user_id?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          canva_team_id?: string | null
          canva_user_id?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      prompts: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          position: number
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          position: number
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          position?: number
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      prompts_old: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_content: {
        Row: {
          content: Json
          content_type: string
          created_at: string
          generation_params: Json | null
          id: string
          is_favorite: boolean
          source_expert: string | null
          title: string
          user_id: string
        }
        Insert: {
          content: Json
          content_type: string
          created_at?: string
          generation_params?: Json | null
          id?: string
          is_favorite?: boolean
          source_expert?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: Json
          content_type?: string
          created_at?: string
          generation_params?: Json | null
          id?: string
          is_favorite?: boolean
          source_expert?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      seo_reports: {
        Row: {
          competitors: string[] | null
          created_at: string | null
          custom_instructions: string | null
          depth: number | null
          id: string
          include_backlinks: boolean | null
          include_content_analysis: boolean | null
          include_keyword_gaps: boolean | null
          include_social_metrics: boolean | null
          keywords: string[] | null
          report_type: string
          report_url: string | null
          status: string
          updated_at: string | null
          url: string
          user_id: string
        }
        Insert: {
          competitors?: string[] | null
          created_at?: string | null
          custom_instructions?: string | null
          depth?: number | null
          id?: string
          include_backlinks?: boolean | null
          include_content_analysis?: boolean | null
          include_keyword_gaps?: boolean | null
          include_social_metrics?: boolean | null
          keywords?: string[] | null
          report_type: string
          report_url?: string | null
          status: string
          updated_at?: string | null
          url: string
          user_id: string
        }
        Update: {
          competitors?: string[] | null
          created_at?: string | null
          custom_instructions?: string | null
          depth?: number | null
          id?: string
          include_backlinks?: boolean | null
          include_content_analysis?: boolean | null
          include_keyword_gaps?: boolean | null
          include_social_metrics?: boolean | null
          keywords?: string[] | null
          report_type?: string
          report_url?: string | null
          status?: string
          updated_at?: string | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      social_media_posts: {
        Row: {
          content: string
          created_at: string | null
          hashtags: string[] | null
          id: string
          is_demo: boolean | null
          platform: string | null
          post_type: string | null
          target_audience: string | null
          title: string | null
          tone: Database["public"]["Enums"]["story_tone"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          is_demo?: boolean | null
          platform?: string | null
          post_type?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          is_demo?: boolean | null
          platform?: string | null
          post_type?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      strategy_results: {
        Row: {
          analysis_type: string | null
          content: string
          created_at: string | null
          id: string
          industry: string | null
          is_demo: boolean | null
          target_market: string | null
          time_horizon: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis_type?: string | null
          content: string
          created_at?: string | null
          id?: string
          industry?: string | null
          is_demo?: boolean | null
          target_market?: string | null
          time_horizon?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_type?: string | null
          content?: string
          created_at?: string | null
          id?: string
          industry?: string | null
          is_demo?: boolean | null
          target_market?: string | null
          time_horizon?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      stripe_customers: {
        Row: {
          created_at: string | null
          customer_id: string
          deleted_at: string | null
          id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          deleted_at?: string | null
          id?: never
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          deleted_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stripe_orders: {
        Row: {
          amount_subtotal: number
          amount_total: number
          checkout_session_id: string
          created_at: string | null
          currency: string
          customer_id: string
          deleted_at: string | null
          id: number
          payment_intent_id: string
          payment_status: string
          status: Database["public"]["Enums"]["stripe_order_status"]
          updated_at: string | null
        }
        Insert: {
          amount_subtotal: number
          amount_total: number
          checkout_session_id: string
          created_at?: string | null
          currency: string
          customer_id: string
          deleted_at?: string | null
          id?: never
          payment_intent_id: string
          payment_status: string
          status?: Database["public"]["Enums"]["stripe_order_status"]
          updated_at?: string | null
        }
        Update: {
          amount_subtotal?: number
          amount_total?: number
          checkout_session_id?: string
          created_at?: string | null
          currency?: string
          customer_id?: string
          deleted_at?: string | null
          id?: never
          payment_intent_id?: string
          payment_status?: string
          status?: Database["public"]["Enums"]["stripe_order_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      stripe_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: number | null
          current_period_start: number | null
          customer_id: string
          deleted_at: string | null
          id: number
          payment_method_brand: string | null
          payment_method_last4: string | null
          price_id: string | null
          status: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer_id: string
          deleted_at?: string | null
          id?: never
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          price_id?: string | null
          status: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer_id?: string
          deleted_at?: string | null
          id?: never
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          price_id?: string | null
          status?: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      style_settings: {
        Row: {
          brand_colors: string[] | null
          company_description: string | null
          company_name: string | null
          created_at: string | null
          custom_fields: Json | null
          custom_instructions: string | null
          formal_language: boolean | null
          id: string
          industry: string | null
          target_audience: string | null
          tone: string
          updated_at: string | null
          use_emojis: boolean | null
          user_id: string
          website_url: string | null
        }
        Insert: {
          brand_colors?: string[] | null
          company_description?: string | null
          company_name?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          custom_instructions?: string | null
          formal_language?: boolean | null
          id?: string
          industry?: string | null
          target_audience?: string | null
          tone?: string
          updated_at?: string | null
          use_emojis?: boolean | null
          user_id: string
          website_url?: string | null
        }
        Update: {
          brand_colors?: string[] | null
          company_description?: string | null
          company_name?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          custom_instructions?: string | null
          formal_language?: boolean | null
          id?: string
          industry?: string | null
          target_audience?: string | null
          tone?: string
          updated_at?: string | null
          use_emojis?: boolean | null
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      task_lists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          list_id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          list_id: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          list_id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "task_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      user_api_keys: {
        Row: {
          api_key: string
          created_at: string
          id: string
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_credentials: {
        Row: {
          access_token: string | null
          created_at: string | null
          id: string
          provider: string
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          provider?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          provider?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          session_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          session_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          preferences: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          brand_keywords: string[] | null
          brand_tone: Database["public"]["Enums"]["story_tone"] | null
          business_industry: string | null
          business_name: string | null
          created_at: string | null
          id: string
          key_demographics: string | null
          primary_goals: Database["public"]["Enums"]["onboarding_goal"][] | null
          products_services: string | null
          system_prompt_preview: string | null
          target_audience_description: string | null
          tool_stack: string[] | null
          updated_at: string | null
          user_id: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          brand_keywords?: string[] | null
          brand_tone?: Database["public"]["Enums"]["story_tone"] | null
          business_industry?: string | null
          business_name?: string | null
          created_at?: string | null
          id?: string
          key_demographics?: string | null
          primary_goals?:
            | Database["public"]["Enums"]["onboarding_goal"][]
            | null
          products_services?: string | null
          system_prompt_preview?: string | null
          target_audience_description?: string | null
          tool_stack?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          brand_keywords?: string[] | null
          brand_tone?: Database["public"]["Enums"]["story_tone"] | null
          business_industry?: string | null
          business_name?: string | null
          created_at?: string | null
          id?: string
          key_demographics?: string | null
          primary_goals?:
            | Database["public"]["Enums"]["onboarding_goal"][]
            | null
          products_services?: string | null
          system_prompt_preview?: string | null
          target_audience_description?: string | null
          tool_stack?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          expert_page: string
          id: string
          input_data: Json | null
          session_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expert_page: string
          id?: string
          input_data?: Json | null
          session_id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expert_page?: string
          id?: string
          input_data?: Json | null
          session_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          api_keys: Json
          created_at: string
          default_model: string
          max_tokens: number
          temperature: number
          updated_at: string
          user_id: string
          webhook_configs: Json
        }
        Insert: {
          api_keys?: Json
          created_at?: string
          default_model: string
          max_tokens?: number
          temperature?: number
          updated_at?: string
          user_id: string
          webhook_configs?: Json
        }
        Update: {
          api_keys?: Json
          created_at?: string
          default_model?: string
          max_tokens?: number
          temperature?: number
          updated_at?: string
          user_id?: string
          webhook_configs?: Json
        }
        Relationships: []
      }
      "User-DataBase": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      video_scripts: {
        Row: {
          content: string
          created_at: string | null
          duration_minutes: number | null
          id: string
          is_demo: boolean | null
          key_message: string | null
          target_audience: string | null
          title: string | null
          tone: Database["public"]["Enums"]["story_tone"] | null
          updated_at: string | null
          user_id: string | null
          video_type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_demo?: boolean | null
          key_message?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
          video_type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_demo?: boolean | null
          key_message?: string | null
          target_audience?: string | null
          title?: string | null
          tone?: Database["public"]["Enums"]["story_tone"] | null
          updated_at?: string | null
          user_id?: string | null
          video_type?: string | null
        }
        Relationships: []
      }
      workflow_credentials: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          name: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json
          id?: string
          name: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workflow_definitions: {
        Row: {
          created_at: string | null
          description: string | null
          edges: Json
          id: string
          is_active: boolean | null
          last_edited_at: string | null
          name: string
          nodes: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          edges?: Json
          id?: string
          is_active?: boolean | null
          last_edited_at?: string | null
          name: string
          nodes?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          edges?: Json
          id?: string
          is_active?: boolean | null
          last_edited_at?: string | null
          name?: string
          nodes?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workflow_executions: {
        Row: {
          error_message: string | null
          executed_at: string | null
          execution_time_ms: number | null
          id: string
          is_test_run: boolean | null
          node_execution_data: Json | null
          response_data: Json | null
          response_status: number | null
          status: string
          trigger_type: string | null
          workflow_definition_id: string | null
          workflow_id: string
        }
        Insert: {
          error_message?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          id?: string
          is_test_run?: boolean | null
          node_execution_data?: Json | null
          response_data?: Json | null
          response_status?: number | null
          status: string
          trigger_type?: string | null
          workflow_definition_id?: string | null
          workflow_id: string
        }
        Update: {
          error_message?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          id?: string
          is_test_run?: boolean | null
          node_execution_data?: Json | null
          response_data?: Json | null
          response_status?: number | null
          status?: string
          trigger_type?: string | null
          workflow_definition_id?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_definition_id_fkey"
            columns: ["workflow_definition_id"]
            isOneToOne: false
            referencedRelation: "workflow_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_node_templates: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          node_data: Json
          node_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          node_data?: Json
          node_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          node_data?: Json
          node_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workflow_nodes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          node_id: string
          position_x: number | null
          position_y: number | null
          title: string
          type: Database["public"]["Enums"]["workflow_node_type"]
          workflow_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          node_id: string
          position_x?: number | null
          position_y?: number | null
          title: string
          type: Database["public"]["Enums"]["workflow_node_type"]
          workflow_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          node_id?: string
          position_x?: number | null
          position_y?: number | null
          title?: string
          type?: Database["public"]["Enums"]["workflow_node_type"]
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_nodes_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "email_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_webhooks: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          method: string
          path: string
          updated_at: string | null
          webhook_key: string
          workflow_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          method?: string
          path: string
          updated_at?: string | null
          webhook_key: string
          workflow_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          method?: string
          path?: string
          updated_at?: string | null
          webhook_key?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_webhooks_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          last_run: string | null
          name: string
          next_run: string | null
          status: string
          success_rate: number | null
          updated_at: string | null
          user_id: string
          webhook_body: string | null
          webhook_headers: Json | null
          webhook_method: string | null
          webhook_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          last_run?: string | null
          name: string
          next_run?: string | null
          status: string
          success_rate?: number | null
          updated_at?: string | null
          user_id: string
          webhook_body?: string | null
          webhook_headers?: Json | null
          webhook_method?: string | null
          webhook_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          last_run?: string | null
          name?: string
          next_run?: string | null
          status?: string
          success_rate?: number | null
          updated_at?: string | null
          user_id?: string
          webhook_body?: string | null
          webhook_headers?: Json | null
          webhook_method?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      stripe_user_orders: {
        Row: {
          amount_subtotal: number | null
          amount_total: number | null
          checkout_session_id: string | null
          currency: string | null
          customer_id: string | null
          order_date: string | null
          order_id: number | null
          order_status:
            | Database["public"]["Enums"]["stripe_order_status"]
            | null
          payment_intent_id: string | null
          payment_status: string | null
        }
        Relationships: []
      }
      stripe_user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          current_period_end: number | null
          current_period_start: number | null
          customer_id: string | null
          payment_method_brand: string | null
          payment_method_last4: string | null
          price_id: string | null
          subscription_id: string | null
          subscription_status:
            | Database["public"]["Enums"]["stripe_subscription_status"]
            | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      onboarding_goal:
        | "Content-Erstellung beschleunigen"
        | "Markenpositionierung stärken"
        | "Social Media optimieren"
        | "E-Mail Marketing verbessern"
        | "Verkaufsprozesse automatisieren"
        | "Kundenkommunikation optimieren"
        | "Innovationsprozesse unterstützen"
        | "Workflows digitalisieren"
      seo_status_enum: "pending" | "processing" | "completed" | "failed"
      story_length: "SHORT" | "MEDIUM" | "LONG"
      story_tone:
        | "PROFESSIONAL"
        | "CASUAL"
        | "FRIENDLY"
        | "FORMAL"
        | "ENTHUSIASTIC"
        | "INFORMATIVE"
        | "INSPIRATIONAL"
        | "EMOTIONAL"
        | "HUMOROUS"
        | "AUTHORITATIVE"
      story_type:
        | "BRAND_ORIGIN"
        | "CUSTOMER_SUCCESS"
        | "PRODUCT_STORY"
        | "FOUNDER_STORY"
        | "MISSION_STORY"
      stripe_order_status: "pending" | "completed" | "canceled"
      stripe_subscription_status:
        | "not_started"
        | "incomplete"
        | "incomplete_expired"
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "paused"
      user_role:
        | "CEO/Gründer"
        | "Marketing Manager"
        | "Content Creator"
        | "Social Media Manager"
        | "Vertriebsleiter"
        | "Produktmanager"
        | "Freelancer"
        | "Berater"
        | "Anderes"
      workflow_node_type: "TRIGGER" | "ACTION" | "DELAY" | "CONDITION"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      onboarding_goal: [
        "Content-Erstellung beschleunigen",
        "Markenpositionierung stärken",
        "Social Media optimieren",
        "E-Mail Marketing verbessern",
        "Verkaufsprozesse automatisieren",
        "Kundenkommunikation optimieren",
        "Innovationsprozesse unterstützen",
        "Workflows digitalisieren",
      ],
      seo_status_enum: ["pending", "processing", "completed", "failed"],
      story_length: ["SHORT", "MEDIUM", "LONG"],
      story_tone: [
        "PROFESSIONAL",
        "CASUAL",
        "FRIENDLY",
        "FORMAL",
        "ENTHUSIASTIC",
        "INFORMATIVE",
        "INSPIRATIONAL",
        "EMOTIONAL",
        "HUMOROUS",
        "AUTHORITATIVE",
      ],
      story_type: [
        "BRAND_ORIGIN",
        "CUSTOMER_SUCCESS",
        "PRODUCT_STORY",
        "FOUNDER_STORY",
        "MISSION_STORY",
      ],
      stripe_order_status: ["pending", "completed", "canceled"],
      stripe_subscription_status: [
        "not_started",
        "incomplete",
        "incomplete_expired",
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
        "paused",
      ],
      user_role: [
        "CEO/Gründer",
        "Marketing Manager",
        "Content Creator",
        "Social Media Manager",
        "Vertriebsleiter",
        "Produktmanager",
        "Freelancer",
        "Berater",
        "Anderes",
      ],
      workflow_node_type: ["TRIGGER", "ACTION", "DELAY", "CONDITION"],
    },
  },
} as const
