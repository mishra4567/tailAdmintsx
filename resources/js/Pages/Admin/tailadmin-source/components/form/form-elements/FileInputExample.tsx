import { ComponentCard, FileInput, Label, cn } from "@/Pages/Admin/tailadmin-source";
import React from "react";

export default function FileInputExample() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className={cn("custom-class")} />
      </div>
    </ComponentCard>
  );
}
