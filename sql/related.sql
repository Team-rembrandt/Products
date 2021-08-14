CREATE TABLE public.related
(
    id bigint NOT NULL DEFAULT nextval('related_id_seq'::regclass),
    current_product_id integer NOT NULL,
    related_product_id integer NOT NULL,
    CONSTRAINT related_pkey PRIMARY KEY (id),
    CONSTRAINT products_id FOREIGN KEY (current_product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT related_product_id FOREIGN KEY (related_product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.related
    OWNER to postgres;

CREATE INDEX fki_products_id
    ON public.related USING btree
    (current_product_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX fki_related_product_id
    ON public.related USING btree
    (related_product_id ASC NULLS LAST)
    TABLESPACE pg_default;