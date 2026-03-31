"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  return (
    <div className="bg-fh-cream relative">
      <div className="container mx-auto px-4 lg:px-0 absolute sm:-top-9 -top-22 inset-x-0">
        <div className="bg-white rounded-[2rem] shadow-2xl border border-black/5 p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-fh-cream-dark pb-4 sm:pb-0 sm:pr-5">
            <Search className="h-5 w-5 text-fh-green-muted shrink-0" />
            <input
              className="flex-1 border-none outline-none bg-transparent text-base text-fh-green-deep placeholder:text-fh-green-muted/50 font-sans"
              placeholder="Search meals, cuisines, or restaurants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") router.push(`/meals?search=${query}`);
              }}
            />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:max-w-48 cursor-pointer border-0">
              <div className="flex items-center gap-2 text-fh-green-muted">
                <MapPin className="text-fh-green-muted" />
                <SelectValue placeholder={`Select a location`} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-fh-green-muted">
                <SelectLabel>Location</SelectLabel>
                <SelectItem value="chattogram">Chattogram</SelectItem>
                <SelectItem value="dhaka">Daka</SelectItem>
                <SelectItem value="rangpur">Rangpur</SelectItem>
                <SelectItem value="barishal">Barishal</SelectItem>
                <SelectItem value="khulna">Khulna</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={() => router.push(`/meals?search=${query}`)}
            className="bg-fh-coral hover:bg-fh-coral-hover text-white h-12 px-7 text-base font-semibold rounded-xl sm:ml-2 cursor-pointer"
          >
            Find Food
          </Button>
        </div>
      </div>
    </div>
  );
}
