import React from "react";
import connectToDatabase from "@/lib/mongodb";
import PropertiesHeadClient from "./PropertiesHeadClient/PropertiesHeadClient";
import { PropertySchemaType } from "@/app/models/properties";

export default async function ServerProperties() {

  const properties = await connectToDatabase();
  
 
  const serverProperties: PropertySchemaType[] = Array.isArray(properties) 
    ? properties 
    : [];

  return <PropertiesHeadClient serverProperties={serverProperties} />;
}