CREATE TABLE public.styles
(
    id bigint NOT NULL DEFAULT nextval('styles_id_seq'::regclass),
    product_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    sale_price integer,
    original_price integer NOT NULL,
    default_style integer NOT NULL,
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