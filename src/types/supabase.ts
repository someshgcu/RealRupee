export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.4"
    }
    public: {
        Tables: {
            coin_transactions: {
                Row: {
                    amount: number
                    created_at: string | null
                    description: string
                    id: string
                    user_id: string | null
                }
                Insert: {
                    amount: number
                    created_at?: string | null
                    description: string
                    id?: string
                    user_id?: string | null
                }
                Update: {
                    amount?: number
                    created_at?: string | null
                    description?: string
                    id?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "coin_transactions_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            leads_enquiries: {
                Row: {
                    created_at: string | null
                    id: string
                    inquirer_email: string
                    inquirer_id: string | null
                    inquirer_name: string
                    inquirer_phone: string
                    is_read: boolean | null
                    message: string
                    owner_id: string | null
                    property_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    inquirer_email: string
                    inquirer_id?: string | null
                    inquirer_name: string
                    inquirer_phone: string
                    is_read?: boolean | null
                    message: string
                    owner_id?: string | null
                    property_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    inquirer_email?: string
                    inquirer_id?: string | null
                    inquirer_name?: string
                    inquirer_phone?: string
                    is_read?: boolean | null
                    message?: string
                    owner_id?: string | null
                    property_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "leads_enquiries_inquirer_id_fkey"
                        columns: ["inquirer_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "leads_enquiries_owner_id_fkey"
                        columns: ["owner_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "leads_enquiries_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    coins_balance: number | null
                    created_at: string | null
                    email: string
                    full_name: string
                    id: string
                    phone_number: string | null
                    referral_code: string | null
                    referred_by: string | null
                    updated_at: string | null
                    whatsapp_number: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    coins_balance?: number | null
                    created_at?: string | null
                    email: string
                    full_name: string
                    id: string
                    phone_number?: string | null
                    referral_code?: string | null
                    referred_by?: string | null
                    updated_at?: string | null
                    whatsapp_number?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    coins_balance?: number | null
                    created_at?: string | null
                    email?: string
                    full_name?: string
                    id?: string
                    phone_number?: string | null
                    referral_code?: string | null
                    referred_by?: string | null
                    updated_at?: string | null
                    whatsapp_number?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_referred_by_fkey"
                        columns: ["referred_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            properties: {
                Row: {
                    additional_costs: string | null
                    amenities: string[] | null
                    area_unit: Database["public"]["Enums"]["area_unit_enum"]
                    area_value: number
                    balconies: number | null
                    bathrooms: number | null
                    bedrooms: number | null
                    car_parking: number | null
                    city: string
                    contact_email_1: string
                    contact_email_2: string | null
                    contact_phone_1: string
                    contact_phone_2: string | null
                    contact_whatsapp: string | null
                    cost_per_unit: number | null
                    created_at: string | null
                    description: string | null
                    door_no: string | null
                    facing: string | null
                    id: string
                    is_rr_validated: boolean | null
                    landmarks: string | null
                    latitude: number | null
                    locality: string
                    longitude: number | null
                    pincode: string
                    price_negotiable: boolean | null
                    property_condition:
                    | Database["public"]["Enums"]["property_condition_enum"]
                    | null
                    property_subtype: string
                    property_type: Database["public"]["Enums"]["property_type_enum"]
                    seller_id: string | null
                    state: string
                    status: Database["public"]["Enums"]["property_status_enum"] | null
                    title: string
                    total_cost: number
                    updated_at: string | null
                    validation_progress: number | null
                    youtube_url: string | null
                }
                Insert: {
                    additional_costs?: string | null
                    amenities?: string[] | null
                    area_unit: Database["public"]["Enums"]["area_unit_enum"]
                    area_value: number
                    balconies?: number | null
                    bathrooms?: number | null
                    bedrooms?: number | null
                    car_parking?: number | null
                    city: string
                    contact_email_1: string
                    contact_email_2?: string | null
                    contact_phone_1: string
                    contact_phone_2?: string | null
                    contact_whatsapp?: string | null
                    cost_per_unit?: number | null
                    created_at?: string | null
                    description?: string | null
                    door_no?: string | null
                    facing?: string | null
                    id?: string
                    is_rr_validated?: boolean | null
                    landmarks?: string | null
                    latitude?: number | null
                    locality: string
                    longitude?: number | null
                    pincode: string
                    price_negotiable?: boolean | null
                    property_condition?:
                    | Database["public"]["Enums"]["property_condition_enum"]
                    | null
                    property_subtype: string
                    property_type: Database["public"]["Enums"]["property_type_enum"]
                    seller_id?: string | null
                    state: string
                    status?: Database["public"]["Enums"]["property_status_enum"] | null
                    title: string
                    total_cost: number
                    updated_at?: string | null
                    validation_progress?: number | null
                    youtube_url?: string | null
                }
                Update: {
                    additional_costs?: string | null
                    amenities?: string[] | null
                    area_unit?: Database["public"]["Enums"]["area_unit_enum"]
                    area_value?: number
                    balconies?: number | null
                    bathrooms?: number | null
                    bedrooms?: number | null
                    car_parking?: number | null
                    city?: string
                    contact_email_1?: string
                    contact_email_2?: string | null
                    contact_phone_1?: string
                    contact_phone_2?: string | null
                    contact_whatsapp?: string | null
                    cost_per_unit?: number | null
                    created_at?: string | null
                    description?: string | null
                    door_no?: string | null
                    facing?: string | null
                    id?: string
                    is_rr_validated?: boolean | null
                    landmarks?: string | null
                    latitude?: number | null
                    locality?: string
                    longitude?: number | null
                    pincode?: string
                    price_negotiable?: boolean | null
                    property_condition?:
                    | Database["public"]["Enums"]["property_condition_enum"]
                    | null
                    property_subtype?: string
                    property_type?: Database["public"]["Enums"]["property_type_enum"]
                    seller_id?: string | null
                    state?: string
                    status?: Database["public"]["Enums"]["property_status_enum"] | null
                    title?: string
                    total_cost?: number
                    updated_at?: string | null
                    validation_progress?: number | null
                    youtube_url?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "properties_seller_id_fkey"
                        columns: ["seller_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            property_documents: {
                Row: {
                    document_name: string
                    file_url: string
                    id: string
                    is_visible: boolean | null
                    property_id: string | null
                    uploaded_at: string | null
                }
                Insert: {
                    document_name: string
                    file_url: string
                    id?: string
                    is_visible?: boolean | null
                    property_id?: string | null
                    uploaded_at?: string | null
                }
                Update: {
                    document_name?: string
                    file_url?: string
                    id?: string
                    is_visible?: boolean | null
                    property_id?: string | null
                    uploaded_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "property_documents_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                ]
            }
            property_images: {
                Row: {
                    created_at: string | null
                    id: string
                    image_url: string
                    is_primary: boolean | null
                    property_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    image_url: string
                    is_primary?: boolean | null
                    property_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    image_url?: string
                    is_primary?: boolean | null
                    property_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "property_images_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                ]
            }
            property_visitors: {
                Row: {
                    id: string
                    owner_id: string | null
                    property_id: string | null
                    source: string | null
                    visited_at: string | null
                    visitor_id: string | null
                    visitor_name: string | null
                }
                Insert: {
                    id?: string
                    owner_id?: string | null
                    property_id?: string | null
                    source?: string | null
                    visited_at?: string | null
                    visitor_id?: string | null
                    visitor_name?: string | null
                }
                Update: {
                    id?: string
                    owner_id?: string | null
                    property_id?: string | null
                    source?: string | null
                    visited_at?: string | null
                    visitor_id?: string | null
                    visitor_name?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "property_visitors_owner_id_fkey"
                        columns: ["owner_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "property_visitors_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "property_visitors_visitor_id_fkey"
                        columns: ["visitor_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            service_transactions: {
                Row: {
                    amount: number
                    created_at: string | null
                    currency: string | null
                    id: string
                    payment_method: string | null
                    property_id: string | null
                    service_type: Database["public"]["Enums"]["service_type_enum"]
                    status: Database["public"]["Enums"]["transaction_status_enum"] | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    amount: number
                    created_at?: string | null
                    currency?: string | null
                    id?: string
                    payment_method?: string | null
                    property_id?: string | null
                    service_type: Database["public"]["Enums"]["service_type_enum"]
                    status?: Database["public"]["Enums"]["transaction_status_enum"] | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    amount?: number
                    created_at?: string | null
                    currency?: string | null
                    id?: string
                    payment_method?: string | null
                    property_id?: string | null
                    service_type?: Database["public"]["Enums"]["service_type_enum"]
                    status?: Database["public"]["Enums"]["transaction_status_enum"] | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "service_transactions_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "service_transactions_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            shortlists: {
                Row: {
                    created_at: string | null
                    id: string
                    property_id: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    property_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    property_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "shortlists_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "shortlists_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            generate_referral_code: { Args: { length: number }; Returns: string }
        }
        Enums: {
            area_unit_enum: "Square feet" | "Square yards" | "Cents" | "Acres"
            property_condition_enum: "New" | "Resale" | "Foreclosure"
            property_status_enum:
            | "Draft"
            | "Awaiting Approval"
            | "Active"
            | "Sold"
            | "Rejected"
            property_type_enum:
            | "Residential"
            | "Commercial"
            | "Agricultural"
            | "Development"
            service_type_enum: "Auction" | "Property Validation" | "Group Buying"
            transaction_status_enum: "Pending" | "Success" | "Failed"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {
            area_unit_enum: ["Square feet", "Square yards", "Cents", "Acres"],
            property_condition_enum: ["New", "Resale", "Foreclosure"],
            property_status_enum: [
                "Draft",
                "Awaiting Approval",
                "Active",
                "Sold",
                "Rejected",
            ],
            property_type_enum: [
                "Residential",
                "Commercial",
                "Agricultural",
                "Development",
            ],
            service_type_enum: ["Auction", "Property Validation", "Group Buying"],
            transaction_status_enum: ["Pending", "Success", "Failed"],
        },
    },
} as const
