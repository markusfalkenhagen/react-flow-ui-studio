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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
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
      workflow_executions: {
        Row: {
          executed_at: string | null
          id: string
          response_data: Json | null
          response_status: number | null
          status: string
          workflow_id: string
        }
        Insert: {
          executed_at?: string | null
          id?: string
          response_data?: Json | null
          response_status?: number | null
          status: string
          workflow_id: string
        }
        Update: {
          executed_at?: string | null
          id?: string
          response_data?: Json | null
          response_status?: number | null
          status?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
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
    },
  },
} as const
