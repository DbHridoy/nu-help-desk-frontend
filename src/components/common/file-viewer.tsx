import Image from "next/image";
import { fileExtension, getFileUrl } from "@/lib/utils";

type FileViewerProps = {
  fileUrl?: string;
  title: string;
};

export function FileViewer({ fileUrl, title }: FileViewerProps) {
  if (!fileUrl) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-600">
        No preview file is available for this item yet.
      </div>
    );
  }

  const resolvedUrl = getFileUrl(fileUrl);
  const extension = fileExtension(resolvedUrl);

  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(extension)) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
        <Image
          src={resolvedUrl}
          alt={title}
          width={1200}
          height={900}
          className="h-auto w-full object-contain"
          unoptimized
        />
      </div>
    );
  }

  if (extension === "pdf") {
    return (
      <iframe
        src={resolvedUrl}
        title={title}
        className="h-[75vh] w-full rounded-[2rem] border border-slate-200 bg-white"
      />
    );
  }

  return (
    <object data={resolvedUrl} className="h-[75vh] w-full rounded-[2rem] border border-slate-200 bg-white">
      <p className="p-6 text-sm text-slate-600">
        Preview is not supported for this file type. Use the download button instead.
      </p>
    </object>
  );
}
