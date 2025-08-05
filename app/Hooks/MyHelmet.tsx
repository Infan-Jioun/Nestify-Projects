"use client";

import { Helmet } from "react-helmet-async";


export default function MyHelmet({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
