CREATE TABLE "land_listing_embeddings" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"listing_id" integer NOT NULL,
	"embedding" vector(768) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "land_listing_embeddings_listing_id_unique" UNIQUE("listing_id")
);
--> statement-breakpoint
ALTER TABLE "land_listing_embeddings" ADD CONSTRAINT "land_listing_embeddings_listing_id_land_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."land_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "land_listing_embeddings_embedding_idx" ON "land_listing_embeddings" USING hnsw ("embedding" vector_cosine_ops);