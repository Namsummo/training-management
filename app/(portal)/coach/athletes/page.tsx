"use client";
import Link from "next/link";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { useState } from "react";
import { useAthleteQuery } from "@/shared/service/hooks/queries/useAthleteList.queries";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EyeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePositionEnumQuery } from "@/shared/service/hooks/queries/usePositionEnum.query";
import { AthleteStatus } from "@/shared/service/types/addAthlete.type";

function PerformanceScore({ score }: { score: number | string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-24 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#5954E6]"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-medium text-[#5954E6]">{score}</span>
    </div>
  );
}
function FitnessBadge({ status }: { status: string }) {
  if (status === "available")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
        <span className="size-1.5 rounded-full bg-green-600" />
        AVAILABLE
      </span>
    );

  if (status === "injured")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
        <span className="size-1.5 rounded-full bg-red-600" />
        INJURED
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
      {status}
    </span>
  );
}
const getInitial = (name?: string) => {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
};
export default function CoachAthletesPage() {
  const [page, setPage] = useState(1);
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [fitnessFilter, setFitnessFilter] = useState<string>("all");
  const { data } = useAthleteQuery(page);
  const { data: positions = [] } = usePositionEnumQuery();
  const pagination = data?.data;
  let users = pagination?.data ?? [];

  // Apply filters
  if (positionFilter !== "all") {
    users = users.filter((u) => u.position_relevance === positionFilter);
  }

  if (fitnessFilter !== "all") {
    users = users.filter((u) => u.fitness_status === fitnessFilter);
  }
  const total = pagination?.total ?? 0;
  const from = pagination?.from ?? 0;
  const to = pagination?.to ?? 0;
  const lastPage = pagination?.last_page ?? 1;
  const links = pagination?.links ?? [];
  const pageNumbers = Array.from(
    new Set(
      links
        .map((link) => link.page)
        .filter(
          (pageValue): pageValue is number => typeof pageValue === "number",
        ),
    ),
  ).sort((a, b) => a - b);
  const visiblePages = pageNumbers.filter(
    (pageNumber) =>
      pageNumber === 1 ||
      pageNumber === lastPage ||
      Math.abs(pageNumber - page) <= 1,
  );
  const showLeftEllipsis = pageNumbers.length > 0 && !visiblePages.includes(2);
  const showRightEllipsis =
    pageNumbers.length > 0 && !visiblePages.includes(lastPage - 1);

  const available = data?.data.data.filter(
    (u) => u.fitness_status === "available",
  );
  const totalStatus = data?.data.data.filter((u) => u.fitness_status);
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Athlete Roster
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitoring 24 active athletes in the First Team Squad
          </p>
        </div>

        <div className="flex items-center gap-3 font-bold">
          <AppButton variant="outline">
            <DownloadIcon size={16} />
            Bulk Export
          </AppButton>
          <AppButton className="border rounded px-3 py-2 bg-[#F5F3FF] text-sm text-[#5954E6]">
            + import athlete list
          </AppButton>
          <Link href="/coach/athletes/create">
            <AppButton>+ Add New Athlete</AppButton>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button className="text-sm text-slate-500" variant="link">
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Position: All" />
              </SelectTrigger>
              <SelectContent
                className="h-[260px] overflow-y-auto"
                position="popper"
                side="bottom"
                align="start"
              >
                <SelectItem value="all">All Positions</SelectItem>
                {positions.map((pos) => (
                  <SelectItem key={pos.key} value={pos.key}>
                    {pos.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={fitnessFilter} onValueChange={setFitnessFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Fitness: Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Status</SelectItem>
                <SelectItem value={AthleteStatus.AVAILABLE}>
                  Available
                </SelectItem>
                <SelectItem value={AthleteStatus.INJURED}>Injured</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto text-sm text-slate-500">
            Sorted by Performance Score
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table className="">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[30%]">Athlete</TableHead>
              <TableHead className="w-[25%]">Position</TableHead>
              <TableHead className="w-[25%]">Fitness Status</TableHead>
              <TableHead className="w-[15%]">AI Perf. Score</TableHead>
              <TableHead className="w-[5%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 5).map((u) => (
              <TableRow key={u.id} className="hover:bg-slate-50 transition">
                {/* Athlete */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    {u.avatar ? (
                      <Image
                        src={u.avatar}
                        alt={u.name}
                        width={36}
                        height={36}
                        className="size-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-500">
                        {getInitial(u.name)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-slate-800">{u.name}</div>
                      <div className="text-xs text-slate-400">ID: #{u.id}</div>
                    </div>
                  </div>
                </TableCell>

                {/* Position */}
                <TableCell className="text-sm text-slate-600">
                  {u.position_relevance ?? "—"}
                </TableCell>

                {/* Fitness */}
                <TableCell>
                  <FitnessBadge status={u.fitness_status ?? "UNKNOWN"} />
                </TableCell>

                {/* AI Score */}
                <TableCell>
                  <PerformanceScore score={75} />
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end pr-4">
                    <Link href={`/coach/athletes/${u.id}`}>
                      <EyeIcon className="size-4 text-slate-400 hover:text-slate-600" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Showing <strong>{from}</strong> to <strong>{to}</strong> of{" "}
                    <strong>{total}</strong> athletes
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Button
                      className="inline-flex size-7 items-center justify-center rounded border border-slate-200 text-black disabled:opacity-40"
                      variant="outline"
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      disabled={page <= 1}
                    >
                      <ChevronLeftIcon size={16} />
                    </Button>

                    {visiblePages.map((pageNumber, index) => (
                      <div key={pageNumber} className="flex items-center gap-1">
                        {pageNumber !== 1 &&
                          index === 1 &&
                          showLeftEllipsis && (
                            <span className="px-2 text-slate-400">…</span>
                          )}
                        <Button
                          className="inline-flex h-7 min-w-7 items-center justify-center rounded border px-2 text-xs"
                          variant={pageNumber === page ? "default" : "outline"}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                        {pageNumber !== lastPage &&
                          showRightEllipsis &&
                          index === visiblePages.length - 2 && (
                            <span className="px-2 text-slate-400">…</span>
                          )}
                      </div>
                    ))}
                    <Button
                      className="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500 disabled:opacity-40"
                      onClick={() =>
                        setPage((prev) => Math.min(lastPage, prev + 1))
                      }
                      disabled={page >= lastPage}
                      variant="outline"
                    >
                      <ChevronRightIcon size={16} />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white p-4 border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <CheckIcon size={16} />
          </div>
          <div>
            <div className="text-sm text-slate-500">Available</div>
            <div className="text-xl font-semibold">
              {available?.length ?? 0}/{totalStatus?.length ?? 0}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
            !
          </div>
          <div>
            <div className="text-sm text-slate-500">At Risk</div>
            <div className="text-xl font-semibold">4</div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700">
            ↗
          </div>
          <div>
            <div className="text-sm text-slate-500">Avg. Performance</div>
            <div className="text-xl font-semibold">78.6</div>
          </div>
        </div>
      </div>
    </div>
  );
}
