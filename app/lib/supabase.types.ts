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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          input_summary: Json | null
          metadata: Json | null
          organization_id: string
          output_summary: Json | null
          policy_id: string | null
          project_id: string | null
          resource_id: string | null
          resource_type: string
          status: Database["public"]["Enums"]["audit_status"]
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          input_summary?: Json | null
          metadata?: Json | null
          organization_id: string
          output_summary?: Json | null
          policy_id?: string | null
          project_id?: string | null
          resource_id?: string | null
          resource_type: string
          status: Database["public"]["Enums"]["audit_status"]
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          input_summary?: Json | null
          metadata?: Json | null
          organization_id?: string
          output_summary?: Json | null
          policy_id?: string | null
          project_id?: string | null
          resource_id?: string | null
          resource_type?: string
          status?: Database["public"]["Enums"]["audit_status"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_chunks: {
        Row: {
          content: string
          content_hash: string
          content_tsv: unknown
          content_type: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id: string
          created_at: string
          document_id: string
          embedded_at: string | null
          embedding: string | null
          embedding_authority_id: string | null
          embedding_error: string | null
          embedding_lease_expires_at: string | null
          embedding_model: string | null
          embedding_model_version: string | null
          embedding_run_id: string | null
          embedding_status: Database["public"]["Enums"]["chunk_embedding_status"]
          frameworks: string[]
          heading_level: number
          heading_path: string[] | null
          id: string
          industries: string[]
          language: string
          parent_chunk_id: string | null
          section_title: string
          segments: string[]
          sequence: number
          sire_excluded: string[]
          sire_included: string[]
          sire_relevant: string[]
          sire_subject: string | null
          tier: Database["public"]["Enums"]["corpus_tier"]
          token_count: number | null
          updated_at: string
        }
        Insert: {
          content: string
          content_hash: string
          content_tsv?: unknown
          content_type: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id: string
          created_at?: string
          document_id: string
          embedded_at?: string | null
          embedding?: string | null
          embedding_authority_id?: string | null
          embedding_error?: string | null
          embedding_lease_expires_at?: string | null
          embedding_model?: string | null
          embedding_model_version?: string | null
          embedding_run_id?: string | null
          embedding_status?: Database["public"]["Enums"]["chunk_embedding_status"]
          frameworks?: string[]
          heading_level?: number
          heading_path?: string[] | null
          id?: string
          industries?: string[]
          language?: string
          parent_chunk_id?: string | null
          section_title: string
          segments?: string[]
          sequence: number
          sire_excluded?: string[]
          sire_included?: string[]
          sire_relevant?: string[]
          sire_subject?: string | null
          tier: Database["public"]["Enums"]["corpus_tier"]
          token_count?: number | null
          updated_at?: string
        }
        Update: {
          content?: string
          content_hash?: string
          content_tsv?: unknown
          content_type?: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id?: string
          created_at?: string
          document_id?: string
          embedded_at?: string | null
          embedding?: string | null
          embedding_authority_id?: string | null
          embedding_error?: string | null
          embedding_lease_expires_at?: string | null
          embedding_model?: string | null
          embedding_model_version?: string | null
          embedding_run_id?: string | null
          embedding_status?: Database["public"]["Enums"]["chunk_embedding_status"]
          frameworks?: string[]
          heading_level?: number
          heading_path?: string[] | null
          id?: string
          industries?: string[]
          language?: string
          parent_chunk_id?: string | null
          section_title?: string
          segments?: string[]
          sequence?: number
          sire_excluded?: string[]
          sire_included?: string[]
          sire_relevant?: string[]
          sire_subject?: string | null
          tier?: Database["public"]["Enums"]["corpus_tier"]
          token_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpus_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_chunks_embedding_authority_id_fkey"
            columns: ["embedding_authority_id"]
            isOneToOne: false
            referencedRelation: "embedding_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_chunks_embedding_run_id_fkey"
            columns: ["embedding_run_id"]
            isOneToOne: false
            referencedRelation: "corpus_pipeline_run_attestations"
            referencedColumns: ["run_id"]
          },
          {
            foreignKeyName: "corpus_chunks_parent_chunk_id_fkey"
            columns: ["parent_chunk_id"]
            isOneToOne: false
            referencedRelation: "corpus_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_chunks_parent_chunk_id_fkey"
            columns: ["parent_chunk_id"]
            isOneToOne: false
            referencedRelation: "corpus_chunks_detail"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_documents: {
        Row: {
          chunk_count: number
          content_hash: string | null
          content_type: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id: string
          frameworks: string[]
          id: string
          industries: string[]
          ingested_at: string
          ingested_by: string | null
          is_active: boolean
          language: string
          last_verified: string | null
          organization_id: string | null
          segments: string[]
          sire_excluded: string[]
          sire_included: string[]
          sire_relevant: string[]
          sire_subject: string | null
          source_publisher: string | null
          source_url: string | null
          tier: Database["public"]["Enums"]["corpus_tier"]
          title: string
          total_tokens: number | null
          updated_at: string
          version: string
        }
        Insert: {
          chunk_count?: number
          content_hash?: string | null
          content_type?: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id: string
          frameworks?: string[]
          id?: string
          industries?: string[]
          ingested_at?: string
          ingested_by?: string | null
          is_active?: boolean
          language?: string
          last_verified?: string | null
          organization_id?: string | null
          segments?: string[]
          sire_excluded?: string[]
          sire_included?: string[]
          sire_relevant?: string[]
          sire_subject?: string | null
          source_publisher?: string | null
          source_url?: string | null
          tier?: Database["public"]["Enums"]["corpus_tier"]
          title: string
          total_tokens?: number | null
          updated_at?: string
          version?: string
        }
        Update: {
          chunk_count?: number
          content_hash?: string | null
          content_type?: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id?: string
          frameworks?: string[]
          id?: string
          industries?: string[]
          ingested_at?: string
          ingested_by?: string | null
          is_active?: boolean
          language?: string
          last_verified?: string | null
          organization_id?: string | null
          segments?: string[]
          sire_excluded?: string[]
          sire_included?: string[]
          sire_relevant?: string[]
          sire_subject?: string | null
          source_publisher?: string | null
          source_url?: string | null
          tier?: Database["public"]["Enums"]["corpus_tier"]
          title?: string
          total_tokens?: number | null
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpus_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_domain_versions: {
        Row: {
          change_summary: string | null
          change_type: string
          created_at: string
          created_by: string | null
          domain_id: string
          id: string
          snapshot: Json
          version: number
        }
        Insert: {
          change_summary?: string | null
          change_type: string
          created_at?: string
          created_by?: string | null
          domain_id: string
          id?: string
          snapshot: Json
          version: number
        }
        Update: {
          change_summary?: string | null
          change_type?: string
          created_at?: string
          created_by?: string | null
          domain_id?: string
          id?: string
          snapshot?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "corpus_domain_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_domain_versions_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "corpus_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_domains: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          organization_id: string | null
          published_at: string | null
          published_by: string | null
          research_query: string | null
          research_synthesis: string | null
          slug: string
          status: Database["public"]["Enums"]["corpus_domain_status"]
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          organization_id?: string | null
          published_at?: string | null
          published_by?: string | null
          research_query?: string | null
          research_synthesis?: string | null
          slug: string
          status?: Database["public"]["Enums"]["corpus_domain_status"]
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          published_at?: string | null
          published_by?: string | null
          research_query?: string | null
          research_synthesis?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["corpus_domain_status"]
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "corpus_domains_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_domains_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_domains_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_embedding_events: {
        Row: {
          chunk_content_hash: string
          chunk_id: string
          document_id: string
          embedding_authority_id: string
          embedding_model: string
          embedding_model_version: string | null
          error: string | null
          id: string
          occurred_at: string
          run_id: string
          status: string
        }
        Insert: {
          chunk_content_hash: string
          chunk_id: string
          document_id: string
          embedding_authority_id: string
          embedding_model: string
          embedding_model_version?: string | null
          error?: string | null
          id?: string
          occurred_at?: string
          run_id: string
          status: string
        }
        Update: {
          chunk_content_hash?: string
          chunk_id?: string
          document_id?: string
          embedding_authority_id?: string
          embedding_model?: string
          embedding_model_version?: string | null
          error?: string | null
          id?: string
          occurred_at?: string
          run_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpus_embedding_events_chunk_id_fkey"
            columns: ["chunk_id"]
            isOneToOne: false
            referencedRelation: "corpus_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_embedding_events_chunk_id_fkey"
            columns: ["chunk_id"]
            isOneToOne: false
            referencedRelation: "corpus_chunks_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_embedding_events_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_embedding_events_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_embedding_events_embedding_authority_id_fkey"
            columns: ["embedding_authority_id"]
            isOneToOne: false
            referencedRelation: "embedding_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_embedding_events_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "corpus_pipeline_run_attestations"
            referencedColumns: ["run_id"]
          },
        ]
      }
      corpus_encyclopedia: {
        Row: {
          chunks_json: Json | null
          corpus_id: string
          created_at: string
          created_by: string | null
          frameworks: string[]
          id: string
          industries: string[]
          markdown: string
          organization_id: string | null
          segments: string[]
          source_document_id: string | null
          source_filename: string
          source_session_id: string | null
          tier: string
          title: string
          updated_at: string
        }
        Insert: {
          chunks_json?: Json | null
          corpus_id: string
          created_at?: string
          created_by?: string | null
          frameworks?: string[]
          id?: string
          industries?: string[]
          markdown: string
          organization_id?: string | null
          segments?: string[]
          source_document_id?: string | null
          source_filename: string
          source_session_id?: string | null
          tier?: string
          title: string
          updated_at?: string
        }
        Update: {
          chunks_json?: Json | null
          corpus_id?: string
          created_at?: string
          created_by?: string | null
          frameworks?: string[]
          id?: string
          industries?: string[]
          markdown?: string
          organization_id?: string | null
          segments?: string[]
          source_document_id?: string | null
          source_filename?: string
          source_session_id?: string | null
          tier?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpus_encyclopedia_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_encyclopedia_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_encyclopedia_source_session_id_fkey"
            columns: ["source_session_id"]
            isOneToOne: false
            referencedRelation: "corpus_parse_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_indexes: {
        Row: {
          chunk_count: number
          chunk_overlap_tokens: number
          chunk_size_tokens: number
          chunking_strategy: string
          completed_at: string | null
          content_hash: string | null
          corpus_id: string
          corpus_version: string
          created_at: string
          created_by: string | null
          document_id: string
          embedding_dimensions: number
          embedding_model: string
          embedding_model_version: string
          freshness_policy_days: number | null
          id: string
          index_hash: string | null
          last_verified_at: string | null
          total_tokens: number | null
        }
        Insert: {
          chunk_count: number
          chunk_overlap_tokens?: number
          chunk_size_tokens?: number
          chunking_strategy?: string
          completed_at?: string | null
          content_hash?: string | null
          corpus_id: string
          corpus_version: string
          created_at?: string
          created_by?: string | null
          document_id: string
          embedding_dimensions?: number
          embedding_model: string
          embedding_model_version: string
          freshness_policy_days?: number | null
          id?: string
          index_hash?: string | null
          last_verified_at?: string | null
          total_tokens?: number | null
        }
        Update: {
          chunk_count?: number
          chunk_overlap_tokens?: number
          chunk_size_tokens?: number
          chunking_strategy?: string
          completed_at?: string | null
          content_hash?: string | null
          corpus_id?: string
          corpus_version?: string
          created_at?: string
          created_by?: string | null
          document_id?: string
          embedding_dimensions?: number
          embedding_model?: string
          embedding_model_version?: string
          freshness_policy_days?: number | null
          id?: string
          index_hash?: string | null
          last_verified_at?: string | null
          total_tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_indexes_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_indexes_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_jobs: {
        Row: {
          created_at: string
          error: string | null
          id: number
          kind: string
          max_retries: number
          payload: Json
          result: Json | null
          retry_count: number
          status: string
          updated_at: string
          visible_at: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: number
          kind: string
          max_retries?: number
          payload: Json
          result?: Json | null
          retry_count?: number
          status?: string
          updated_at?: string
          visible_at?: string
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: number
          kind?: string
          max_retries?: number
          payload?: Json
          result?: Json | null
          retry_count?: number
          status?: string
          updated_at?: string
          visible_at?: string
        }
        Relationships: []
      }
      corpus_parse_drafts: {
        Row: {
          created_at: string
          created_by: string | null
          document_id: string | null
          id: string
          organization_id: string | null
          parse_model: string | null
          parse_tokens_in: number | null
          parse_tokens_out: number | null
          parsed_markdown: string | null
          reviewer_id: string | null
          reviewer_notes: string | null
          source_filename: string
          source_hash: string
          source_text: string
          status: string
          updated_at: string
          user_markdown: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          document_id?: string | null
          id?: string
          organization_id?: string | null
          parse_model?: string | null
          parse_tokens_in?: number | null
          parse_tokens_out?: number | null
          parsed_markdown?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          source_filename: string
          source_hash: string
          source_text: string
          status?: string
          updated_at?: string
          user_markdown?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          document_id?: string | null
          id?: string
          organization_id?: string | null
          parse_model?: string | null
          parse_tokens_in?: number | null
          parse_tokens_out?: number | null
          parsed_markdown?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          source_filename?: string
          source_hash?: string
          source_text?: string
          status?: string
          updated_at?: string
          user_markdown?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_parse_drafts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_parse_drafts_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_parse_drafts_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "corpus_documents_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_parse_drafts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_parse_drafts_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_parse_sessions: {
        Row: {
          created_at: string
          created_by: string | null
          crosswalk_chunks_json: Json | null
          crosswalk_markdown: string | null
          crosswalk_model: string | null
          crosswalk_tokens_in: number | null
          crosswalk_tokens_out: number | null
          id: string
          is_public: boolean
          name: string
          organization_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          crosswalk_chunks_json?: Json | null
          crosswalk_markdown?: string | null
          crosswalk_model?: string | null
          crosswalk_tokens_in?: number | null
          crosswalk_tokens_out?: number | null
          id?: string
          is_public?: boolean
          name?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          crosswalk_chunks_json?: Json | null
          crosswalk_markdown?: string | null
          crosswalk_model?: string | null
          crosswalk_tokens_in?: number | null
          crosswalk_tokens_out?: number | null
          id?: string
          is_public?: boolean
          name?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpus_parse_sessions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_parse_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_pipeline_envelopes: {
        Row: {
          action: string
          attestation_run_id: string | null
          chunk_count: number | null
          completed_at: string | null
          corpus_id: string | null
          created_at: string
          duration_ms: number | null
          egress_policy_id: string | null
          embedded_count: number | null
          embedding: Json | null
          embedding_authority_id: string | null
          error: string | null
          id: string
          ingestion: Json | null
          ingestion_action: string | null
          organization_id: string | null
          rechunk_meta: Json | null
          run_id: string
          started_at: string
          triggered_by: string
          user_id: string | null
          validation: Json | null
          validation_valid: boolean | null
        }
        Insert: {
          action: string
          attestation_run_id?: string | null
          chunk_count?: number | null
          completed_at?: string | null
          corpus_id?: string | null
          created_at?: string
          duration_ms?: number | null
          egress_policy_id?: string | null
          embedded_count?: number | null
          embedding?: Json | null
          embedding_authority_id?: string | null
          error?: string | null
          id?: string
          ingestion?: Json | null
          ingestion_action?: string | null
          organization_id?: string | null
          rechunk_meta?: Json | null
          run_id: string
          started_at: string
          triggered_by: string
          user_id?: string | null
          validation?: Json | null
          validation_valid?: boolean | null
        }
        Update: {
          action?: string
          attestation_run_id?: string | null
          chunk_count?: number | null
          completed_at?: string | null
          corpus_id?: string | null
          created_at?: string
          duration_ms?: number | null
          egress_policy_id?: string | null
          embedded_count?: number | null
          embedding?: Json | null
          embedding_authority_id?: string | null
          error?: string | null
          id?: string
          ingestion?: Json | null
          ingestion_action?: string | null
          organization_id?: string | null
          rechunk_meta?: Json | null
          run_id?: string
          started_at?: string
          triggered_by?: string
          user_id?: string | null
          validation?: Json | null
          validation_valid?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_pipeline_envelopes_attestation_run_id_fkey"
            columns: ["attestation_run_id"]
            isOneToOne: false
            referencedRelation: "corpus_pipeline_run_attestations"
            referencedColumns: ["run_id"]
          },
          {
            foreignKeyName: "corpus_pipeline_envelopes_egress_policy_id_fkey"
            columns: ["egress_policy_id"]
            isOneToOne: false
            referencedRelation: "egress_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_pipeline_envelopes_embedding_authority_id_fkey"
            columns: ["embedding_authority_id"]
            isOneToOne: false
            referencedRelation: "embedding_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_pipeline_envelopes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_pipeline_envelopes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_pipeline_run_attestations: {
        Row: {
          created_at: string
          egress_policy_id: string
          embedding_authority_id: string
          environment: string
          input_manifest_hash: string | null
          organization_id: string | null
          output_manifest_hash: string | null
          run_id: string
          triggered_by: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          egress_policy_id: string
          embedding_authority_id: string
          environment?: string
          input_manifest_hash?: string | null
          organization_id?: string | null
          output_manifest_hash?: string | null
          run_id: string
          triggered_by: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          egress_policy_id?: string
          embedding_authority_id?: string
          environment?: string
          input_manifest_hash?: string | null
          organization_id?: string | null
          output_manifest_hash?: string | null
          run_id?: string
          triggered_by?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_pipeline_run_attestations_egress_policy_id_fkey"
            columns: ["egress_policy_id"]
            isOneToOne: false
            referencedRelation: "egress_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_pipeline_run_attestations_embedding_authority_id_fkey"
            columns: ["embedding_authority_id"]
            isOneToOne: false
            referencedRelation: "embedding_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_pipeline_run_attestations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_pipeline_run_attestations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_session_documents: {
        Row: {
          chunks_json: Json | null
          created_at: string
          created_by: string | null
          error_message: string | null
          id: string
          organization_id: string | null
          parse_model: string | null
          parse_tokens_in: number | null
          parse_tokens_out: number | null
          parsed_markdown: string | null
          promoted_at: string | null
          session_id: string
          sort_order: number
          source_filename: string
          source_hash: string
          source_storage_path: string | null
          source_text: string
          status: string
          updated_at: string
          user_markdown: string | null
        }
        Insert: {
          chunks_json?: Json | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          organization_id?: string | null
          parse_model?: string | null
          parse_tokens_in?: number | null
          parse_tokens_out?: number | null
          parsed_markdown?: string | null
          promoted_at?: string | null
          session_id: string
          sort_order?: number
          source_filename: string
          source_hash: string
          source_storage_path?: string | null
          source_text: string
          status?: string
          updated_at?: string
          user_markdown?: string | null
        }
        Update: {
          chunks_json?: Json | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          organization_id?: string | null
          parse_model?: string | null
          parse_tokens_in?: number | null
          parse_tokens_out?: number | null
          parsed_markdown?: string | null
          promoted_at?: string | null
          session_id?: string
          sort_order?: number
          source_filename?: string
          source_hash?: string
          source_storage_path?: string | null
          source_text?: string
          status?: string
          updated_at?: string
          user_markdown?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_session_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_session_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_session_documents_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "corpus_parse_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_sources: {
        Row: {
          authority_level: Database["public"]["Enums"]["corpus_authority_level"]
          authority_signals: string[]
          confidence: number
          connection_config: Json | null
          created_at: string
          description: string | null
          domain_id: string
          evidence_quotes: string[] | null
          id: string
          is_active: boolean
          is_connected: boolean
          last_verified_at: string | null
          query_capabilities: string[]
          source_id: string
          source_name: string
          source_type: Database["public"]["Enums"]["corpus_source_type"]
          source_url: string | null
          updated_at: string
          upstream_version: string | null
          verifiable_claims: string[]
        }
        Insert: {
          authority_level?: Database["public"]["Enums"]["corpus_authority_level"]
          authority_signals?: string[]
          confidence?: number
          connection_config?: Json | null
          created_at?: string
          description?: string | null
          domain_id: string
          evidence_quotes?: string[] | null
          id?: string
          is_active?: boolean
          is_connected?: boolean
          last_verified_at?: string | null
          query_capabilities?: string[]
          source_id: string
          source_name: string
          source_type?: Database["public"]["Enums"]["corpus_source_type"]
          source_url?: string | null
          updated_at?: string
          upstream_version?: string | null
          verifiable_claims?: string[]
        }
        Update: {
          authority_level?: Database["public"]["Enums"]["corpus_authority_level"]
          authority_signals?: string[]
          confidence?: number
          connection_config?: Json | null
          created_at?: string
          description?: string | null
          domain_id?: string
          evidence_quotes?: string[] | null
          id?: string
          is_active?: boolean
          is_connected?: boolean
          last_verified_at?: string | null
          query_capabilities?: string[]
          source_id?: string
          source_name?: string
          source_type?: Database["public"]["Enums"]["corpus_source_type"]
          source_url?: string | null
          updated_at?: string
          upstream_version?: string | null
          verifiable_claims?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "corpus_sources_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "corpus_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_state_axes: {
        Row: {
          axis_type: Database["public"]["Enums"]["state_axis_type"]
          confidence: number
          corpus_source_id: string | null
          created_at: string
          default_value: string | null
          description: string | null
          display_order: number
          domain_id: string
          evidence_quote: string | null
          extraction_prompt: string | null
          id: string
          is_required: boolean
          key: string
          label: string
          possible_values: string[] | null
          range_max: number | null
          range_min: number | null
          reasoning: string | null
          updated_at: string
          validation_pattern: string | null
        }
        Insert: {
          axis_type?: Database["public"]["Enums"]["state_axis_type"]
          confidence?: number
          corpus_source_id?: string | null
          created_at?: string
          default_value?: string | null
          description?: string | null
          display_order?: number
          domain_id: string
          evidence_quote?: string | null
          extraction_prompt?: string | null
          id?: string
          is_required?: boolean
          key: string
          label: string
          possible_values?: string[] | null
          range_max?: number | null
          range_min?: number | null
          reasoning?: string | null
          updated_at?: string
          validation_pattern?: string | null
        }
        Update: {
          axis_type?: Database["public"]["Enums"]["state_axis_type"]
          confidence?: number
          corpus_source_id?: string | null
          created_at?: string
          default_value?: string | null
          description?: string | null
          display_order?: number
          domain_id?: string
          evidence_quote?: string | null
          extraction_prompt?: string | null
          id?: string
          is_required?: boolean
          key?: string
          label?: string
          possible_values?: string[] | null
          range_max?: number | null
          range_min?: number | null
          reasoning?: string | null
          updated_at?: string
          validation_pattern?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_state_axes_corpus_source_id_fkey"
            columns: ["corpus_source_id"]
            isOneToOne: false
            referencedRelation: "corpus_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_state_axes_corpus_source_id_fkey"
            columns: ["corpus_source_id"]
            isOneToOne: false
            referencedRelation: "corpus_sources_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_state_axes_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "corpus_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      egress_policies: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          policy_hash: string
          scope: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          policy_hash: string
          scope?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          policy_hash?: string
          scope?: string
        }
        Relationships: [
          {
            foreignKeyName: "egress_policies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      embedding_authorities: {
        Row: {
          container_image_digest: string | null
          created_at: string
          environment: string
          id: string
          instance_id: string | null
          is_active: boolean
          name: string
          notes: string | null
          owner: string | null
          updated_at: string
        }
        Insert: {
          container_image_digest?: string | null
          created_at?: string
          environment?: string
          id?: string
          instance_id?: string | null
          is_active?: boolean
          name: string
          notes?: string | null
          owner?: string | null
          updated_at?: string
        }
        Update: {
          container_image_digest?: string | null
          created_at?: string
          environment?: string
          id?: string
          instance_id?: string | null
          is_active?: boolean
          name?: string
          notes?: string | null
          owner?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ontology_edges: {
        Row: {
          attributes: Json
          created_at: string
          edge_type: string
          id: string
          label: string | null
          ontology_id: string
          source_node_id: string
          target_node_id: string
        }
        Insert: {
          attributes?: Json
          created_at?: string
          edge_type: string
          id?: string
          label?: string | null
          ontology_id: string
          source_node_id: string
          target_node_id: string
        }
        Update: {
          attributes?: Json
          created_at?: string
          edge_type?: string
          id?: string
          label?: string | null
          ontology_id?: string
          source_node_id?: string
          target_node_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ontology_edges_ontology_id_fkey"
            columns: ["ontology_id"]
            isOneToOne: false
            referencedRelation: "project_ontologies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ontology_edges_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "ontology_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ontology_edges_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "ontology_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      ontology_nodes: {
        Row: {
          attributes: Json
          created_at: string
          description: string | null
          id: string
          label: string
          node_type: string
          ontology_id: string
          position_x: number | null
          position_y: number | null
          updated_at: string
        }
        Insert: {
          attributes?: Json
          created_at?: string
          description?: string | null
          id?: string
          label: string
          node_type: string
          ontology_id: string
          position_x?: number | null
          position_y?: number | null
          updated_at?: string
        }
        Update: {
          attributes?: Json
          created_at?: string
          description?: string | null
          id?: string
          label?: string
          node_type?: string
          ontology_id?: string
          position_x?: number | null
          position_y?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ontology_nodes_ontology_id_fkey"
            columns: ["ontology_id"]
            isOneToOne: false
            referencedRelation: "project_ontologies"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["organization_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["organization_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["organization_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      policies: {
        Row: {
          action: Database["public"]["Enums"]["policy_action"]
          conditions: Json
          created_at: string
          description: string | null
          id: string
          name: string
          priority: number
          project_id: string
          status: Database["public"]["Enums"]["policy_status"]
          updated_at: string
        }
        Insert: {
          action?: Database["public"]["Enums"]["policy_action"]
          conditions?: Json
          created_at?: string
          description?: string | null
          id?: string
          name: string
          priority?: number
          project_id: string
          status?: Database["public"]["Enums"]["policy_status"]
          updated_at?: string
        }
        Update: {
          action?: Database["public"]["Enums"]["policy_action"]
          conditions?: Json
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          priority?: number
          project_id?: string
          status?: Database["public"]["Enums"]["policy_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "policies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_ontologies: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          project_id: string
          status: Database["public"]["Enums"]["ontology_status"]
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          project_id: string
          status?: Database["public"]["Enums"]["ontology_status"]
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          project_id?: string
          status?: Database["public"]["Enums"]["ontology_status"]
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_ontologies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_ontologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      corpus_chunks_detail: {
        Row: {
          content_hash: string | null
          content_length_chars: number | null
          content_type:
            | Database["public"]["Enums"]["corpus_content_type"]
            | null
          corpus_id: string | null
          created_at: string | null
          document_active: boolean | null
          document_title: string | null
          embedded_at: string | null
          embedding_authority_id: string | null
          embedding_error: string | null
          embedding_lease_expires_at: string | null
          embedding_run_id: string | null
          embedding_status:
            | Database["public"]["Enums"]["chunk_embedding_status"]
            | null
          frameworks: string[] | null
          heading_path: string[] | null
          id: string | null
          industries: string[] | null
          organization_id: string | null
          section_title: string | null
          segments: string[] | null
          sequence: number | null
          tier: Database["public"]["Enums"]["corpus_tier"] | null
          token_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_chunks_embedding_authority_id_fkey"
            columns: ["embedding_authority_id"]
            isOneToOne: false
            referencedRelation: "embedding_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corpus_chunks_embedding_run_id_fkey"
            columns: ["embedding_run_id"]
            isOneToOne: false
            referencedRelation: "corpus_pipeline_run_attestations"
            referencedColumns: ["run_id"]
          },
          {
            foreignKeyName: "corpus_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_documents_summary: {
        Row: {
          chunk_count: number | null
          content_type:
            | Database["public"]["Enums"]["corpus_content_type"]
            | null
          corpus_id: string | null
          embedded_chunks: number | null
          failed_chunks: number | null
          frameworks: string[] | null
          id: string | null
          industries: string[] | null
          ingested_at: string | null
          is_active: boolean | null
          last_verified: string | null
          latest_embedding_model: string | null
          organization_id: string | null
          pending_chunks: number | null
          processing_chunks: number | null
          segments: string[] | null
          tier: Database["public"]["Enums"]["corpus_tier"] | null
          title: string | null
          total_tokens: number | null
          updated_at: string | null
          version: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_pipeline_envelope_summary: {
        Row: {
          action: string | null
          completed_at: string | null
          corpus_count: number | null
          error_count: number | null
          ingested_count: number | null
          max_duration_ms: number | null
          run_id: string | null
          started_at: string | null
          total_embedded: number | null
          triggered_by: string | null
          user_id: string | null
          valid_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_pipeline_envelopes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_sources_safe: {
        Row: {
          authority_level:
            | Database["public"]["Enums"]["corpus_authority_level"]
            | null
          authority_signals: string[] | null
          confidence: number | null
          created_at: string | null
          description: string | null
          domain_id: string | null
          evidence_quotes: string[] | null
          id: string | null
          is_active: boolean | null
          is_connected: boolean | null
          last_verified_at: string | null
          query_capabilities: string[] | null
          source_id: string | null
          source_name: string | null
          source_type: Database["public"]["Enums"]["corpus_source_type"] | null
          source_url: string | null
          updated_at: string | null
          upstream_version: string | null
          verifiable_claims: string[] | null
        }
        Insert: {
          authority_level?:
            | Database["public"]["Enums"]["corpus_authority_level"]
            | null
          authority_signals?: string[] | null
          confidence?: number | null
          created_at?: string | null
          description?: string | null
          domain_id?: string | null
          evidence_quotes?: string[] | null
          id?: string | null
          is_active?: boolean | null
          is_connected?: boolean | null
          last_verified_at?: string | null
          query_capabilities?: string[] | null
          source_id?: string | null
          source_name?: string | null
          source_type?: Database["public"]["Enums"]["corpus_source_type"] | null
          source_url?: string | null
          updated_at?: string | null
          upstream_version?: string | null
          verifiable_claims?: string[] | null
        }
        Update: {
          authority_level?:
            | Database["public"]["Enums"]["corpus_authority_level"]
            | null
          authority_signals?: string[] | null
          confidence?: number | null
          created_at?: string | null
          description?: string | null
          domain_id?: string | null
          evidence_quotes?: string[] | null
          id?: string | null
          is_active?: boolean | null
          is_connected?: boolean | null
          last_verified_at?: string | null
          query_capabilities?: string[] | null
          source_id?: string | null
          source_name?: string | null
          source_type?: Database["public"]["Enums"]["corpus_source_type"] | null
          source_url?: string | null
          updated_at?: string | null
          upstream_version?: string | null
          verifiable_claims?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "corpus_sources_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "corpus_domains"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      claim_corpus_chunks_for_embedding: {
        Args: {
          p_batch_size?: number
          p_embedding_authority_id: string
          p_filter_corpus_ids?: string[]
          p_filter_org_id?: string
          p_lease_seconds?: number
          p_run_id: string
        }
        Returns: {
          chunk_id: string
          content: string
          content_hash: string
          corpus_id: string
          document_id: string
          language: string
          section_title: string
        }[]
      }
      claim_next_job: {
        Args: { lease_seconds?: number }
        Returns: {
          created_at: string
          error: string | null
          id: number
          kind: string
          max_retries: number
          payload: Json
          result: Json | null
          retry_count: number
          status: string
          updated_at: string
          visible_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "corpus_jobs"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      complete_corpus_chunk_embedding: {
        Args: {
          p_chunk_id: string
          p_embedding: string
          p_embedding_authority_id: string
          p_embedding_model: string
          p_embedding_model_version?: string
          p_run_id: string
        }
        Returns: boolean
      }
      fail_corpus_chunk_embedding: {
        Args: {
          p_chunk_id: string
          p_embedding_authority_id: string
          p_error: string
          p_run_id: string
        }
        Returns: boolean
      }
      match_corpus_chunks: {
        Args: {
          filter_content_type?: Database["public"]["Enums"]["corpus_content_type"]
          filter_corpus_ids?: string[]
          filter_frameworks?: string[]
          filter_industries?: string[]
          filter_organization_id?: string
          filter_segments?: string[]
          filter_tier?: Database["public"]["Enums"]["corpus_tier"]
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          content_hash: string
          content_type: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id: string
          document_id: string
          frameworks: string[]
          id: string
          industries: string[]
          section_title: string
          segments: string[]
          similarity: number
          sire_excluded: string[]
          sire_included: string[]
          sire_relevant: string[]
          sire_subject: string
          tier: Database["public"]["Enums"]["corpus_tier"]
        }[]
      }
      match_corpus_chunks_hybrid: {
        Args: {
          filter_content_type?: Database["public"]["Enums"]["corpus_content_type"]
          filter_corpus_ids?: string[]
          filter_industries?: string[]
          filter_organization_id?: string
          filter_segments?: string[]
          filter_tier?: Database["public"]["Enums"]["corpus_tier"]
          match_count?: number
          match_threshold?: number
          query_embedding: string
          query_text: string
          semantic_weight?: number
        }
        Returns: {
          combined_score: number
          content: string
          content_hash: string
          content_type: Database["public"]["Enums"]["corpus_content_type"]
          corpus_id: string
          document_id: string
          frameworks: string[]
          id: string
          industries: string[]
          section_title: string
          segments: string[]
          similarity: number
          sire_excluded: string[]
          sire_included: string[]
          sire_relevant: string[]
          sire_subject: string
          text_rank: number
          tier: Database["public"]["Enums"]["corpus_tier"]
        }[]
      }
      reap_stale_jobs: { Args: never; Returns: number }
      start_pipeline_run: {
        Args: {
          p_egress_policy_id: string
          p_embedding_authority_id: string
          p_organization_id?: string
          p_run_id: string
          p_triggered_by: string
          p_user_id?: string
        }
        Returns: string
      }
      upsert_corpus_document: {
        Args: {
          p_content_hash?: string
          p_content_type: Database["public"]["Enums"]["corpus_content_type"]
          p_corpus_id: string
          p_frameworks: string[]
          p_industries: string[]
          p_ingested_by?: string
          p_language?: string
          p_last_verified?: string
          p_organization_id?: string
          p_segments: string[]
          p_sire_excluded?: string[]
          p_sire_included?: string[]
          p_sire_relevant?: string[]
          p_sire_subject?: string
          p_source_publisher?: string
          p_source_url?: string
          p_tier: Database["public"]["Enums"]["corpus_tier"]
          p_title: string
          p_version: string
        }
        Returns: {
          action: string
          document_id: string
        }[]
      }
      user_admin_org_ids: { Args: never; Returns: string[] }
      user_org_ids: { Args: never; Returns: string[] }
      uuid_generate_v7: { Args: never; Returns: string }
    }
    Enums: {
      audit_status: "AUTHORIZED" | "BLOCKED" | "NEEDS_REVIEW" | "ERROR"
      chunk_embedding_status:
        | "pending"
        | "processing"
        | "complete"
        | "failed"
        | "stale"
      corpus_authority_level: "system_of_record" | "authoritative" | "advisory"
      corpus_content_type: "prose" | "boundary" | "structured"
      corpus_domain_status: "draft" | "review" | "active" | "archived"
      corpus_source_type:
        | "regulatory"
        | "database"
        | "standard"
        | "documentation"
        | "api"
      corpus_tier: "tier_1" | "tier_2" | "tier_3"
      ontology_status: "draft" | "published" | "archived"
      organization_role: "owner" | "admin" | "member"
      policy_action: "AUTHORIZED" | "BLOCKED" | "NEEDS_REVIEW"
      policy_status: "active" | "inactive"
      state_axis_type:
        | "enum"
        | "boolean"
        | "range"
        | "identifier"
        | "timestamp"
        | "validated_free"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          deleted_at: string | null
          format: string
          id: string
          name: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      buckets_vectors: {
        Row: {
          created_at: string
          id: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      vector_indexes: {
        Row: {
          bucket_id: string
          created_at: string
          data_type: string
          dimension: number
          distance_metric: string
          id: string
          metadata_configuration: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          data_type: string
          dimension: number
          distance_metric: string
          id?: string
          metadata_configuration?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          data_type?: string
          dimension?: number
          distance_metric?: string
          id?: string
          metadata_configuration?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vector_indexes_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets_vectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      extension: { Args: { name: string }; Returns: string }
      filename: { Args: { name: string }; Returns: string }
      foldername: { Args: { name: string }; Returns: string[] }
      get_common_prefix: {
        Args: { p_delimiter: string; p_key: string; p_prefix: string }
        Returns: string
      }
      get_size_by_bucket: {
        Args: never
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          _bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      operation: { Args: never; Returns: string }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_by_timestamp: {
        Args: {
          p_bucket_id: string
          p_level: number
          p_limit: number
          p_prefix: string
          p_sort_column: string
          p_sort_column_after: string
          p_sort_order: string
          p_start_after: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: "STANDARD" | "ANALYTICS" | "VECTOR"
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
      audit_status: ["AUTHORIZED", "BLOCKED", "NEEDS_REVIEW", "ERROR"],
      chunk_embedding_status: [
        "pending",
        "processing",
        "complete",
        "failed",
        "stale",
      ],
      corpus_authority_level: ["system_of_record", "authoritative", "advisory"],
      corpus_content_type: ["prose", "boundary", "structured"],
      corpus_domain_status: ["draft", "review", "active", "archived"],
      corpus_source_type: [
        "regulatory",
        "database",
        "standard",
        "documentation",
        "api",
      ],
      corpus_tier: ["tier_1", "tier_2", "tier_3"],
      ontology_status: ["draft", "published", "archived"],
      organization_role: ["owner", "admin", "member"],
      policy_action: ["AUTHORIZED", "BLOCKED", "NEEDS_REVIEW"],
      policy_status: ["active", "inactive"],
      state_axis_type: [
        "enum",
        "boolean",
        "range",
        "identifier",
        "timestamp",
        "validated_free",
      ],
    },
  },
  storage: {
    Enums: {
      buckettype: ["STANDARD", "ANALYTICS", "VECTOR"],
    },
  },
} as const
