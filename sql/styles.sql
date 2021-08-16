CREATE TABLE public.styles
(
    id bigint NOT NULL,
    product_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    sale_price integer,
    original_price integer NOT NULL,
    default_style boolean NOT NULL,
    CONSTRAINT styles_pkey PRIMARY KEY (id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.styles
    OWNER to postgres;

CREATE INDEX styles_index
    ON public.styles USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX styles_product_index
    ON public.styles USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;