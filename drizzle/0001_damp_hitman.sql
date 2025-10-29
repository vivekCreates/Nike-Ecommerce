CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"slug" text,
	"logo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"slug" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "colors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"label" text,
	"slug" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "productImages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"gender_id" uuid NOT NULL,
	"brand_id" uuid,
	"url" text NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_primary" boolean DEFAULT false,
	"is_published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "productVariants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"sku" text,
	"price" integer NOT NULL,
	"sale_price" integer,
	"color_id" uuid NOT NULL,
	"size_id" uuid NOT NULL,
	"in_stock" integer,
	"weight" integer,
	"dimensions" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"category_id" uuid NOT NULL,
	"gender_id" uuid NOT NULL,
	"brand_id" uuid,
	"is_published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sizes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"sort_order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_variant_id_productVariants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_gender_id_genders_id_fk" FOREIGN KEY ("gender_id") REFERENCES "public"."genders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_color_id_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_users_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_gender_id_genders_id_fk" FOREIGN KEY ("gender_id") REFERENCES "public"."genders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;