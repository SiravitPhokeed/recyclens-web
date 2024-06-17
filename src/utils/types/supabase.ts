type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bins: {
        Row: {
          collect_end: string | null;
          collect_info: string | null;
          collect_start: string | null;
          created_at: string | null;
          hex_color: string;
          id: number;
          image: string | null;
          last_truck: string | null;
          name: string;
          name_local: string | null;
        };
        Insert: {
          collect_end?: string | null;
          collect_info?: string | null;
          collect_start?: string | null;
          created_at?: string | null;
          hex_color: string | null;
          id?: number;
          image?: string | null;
          last_truck?: string | null;
          name: string | null;
          name_local?: string | null;
        };
        Update: {
          collect_end?: string | null;
          collect_info?: string | null;
          collect_start?: string | null;
          created_at?: string | null;
          hex_color: string | null;
          id?: number;
          image?: string | null;
          last_truck?: string | null;
          name: string | null;
          name_local?: string | null;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          allow_collect: boolean;
          bin: number | null;
          can_donate: boolean;
          collect_info: string | null;
          created_at: string | null;
          donate_info: string | null;
          id: number;
          name: string;
          preparation: string;
          region: number;
          restrictions: string | null;
          should_repair: boolean;
        };
        Insert: {
          allow_collect?: boolean;
          bin?: number | null;
          can_donate?: boolean;
          collect_info?: string | null;
          created_at?: string | null;
          donate_info?: string | null;
          id?: number;
          name: string | null;
          preparation: string | null;
          region: number;
          restrictions?: string | null;
          should_repair?: boolean;
        };
        Update: {
          allow_collect?: boolean;
          bin?: number | null;
          can_donate?: boolean;
          collect_info?: string | null;
          created_at?: string | null;
          donate_info?: string | null;
          id?: number;
          name: string | null;
          preparation: string | null;
          region?: number;
          restrictions?: string | null;
          should_repair?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "categories_bin_fkey";
            columns: ["bin"];
            isOneToOne: false;
            referencedRelation: "bins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "categories_region_fkey";
            columns: ["region"];
            isOneToOne: false;
            referencedRelation: "regions";
            referencedColumns: ["id"];
          },
        ];
      };
      regions: {
        Row: {
          city: string;
          code: string;
          country: string | null;
          created_at: string | null;
          id: number;
        };
        Insert: {
          city: string | null;
          code: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: number;
        };
        Update: {
          city: string | null;
          code: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
