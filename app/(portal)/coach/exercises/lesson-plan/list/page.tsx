"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useGetListTrainingPlans } from "@/shared/service/hooks/queries/useGetListTrainingPlans.query";
import { Plan } from "@/shared/service/types/listTrainingPlans.type";
import { Button } from "@/components/ui/button";
import { useDeletePlanMutation } from "@/shared/service/hooks/mutations/deletePlan.mutation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function getInitials(name?: string) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function diffInDays(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

function statusBadge(status: Plan["status"]) {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700";
    case "draft":
      return "bg-slate-100 text-slate-700";
    case "archived":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
export default function Page() {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const deletePlanMutation = useDeletePlanMutation();

  const { data, isLoading, error } = useGetListTrainingPlans({
    per_page: 10,
    get_all: 0,
  });
  const plans: Plan[] = useMemo(() => data?.data.data ?? [], [data]);

  const handleDeleteClick = (planId: number) => {
    setSelectedPlanId(planId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPlanId) {
      try {
        await deletePlanMutation.mutateAsync(selectedPlanId);
        setDeleteDialogOpen(false);
        setSelectedPlanId(null);
      } catch (error) {
        console.error("Failed to delete plan:", error);
      }
    }
  };

  const handleEditClick = (planId: number) => {
    router.push(`/coach/exercises/lesson-plan/${planId}/edit`);
  };

  if (isLoading) {
    return <div className="p-6">Loading training plans...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load plans</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Training Plans</h1>
          <p className="text-sm text-slate-500 mt-1">
            {plans.length} total plans
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AppButton variant="outline">Import</AppButton>
          <AppButton
            onClick={() => router.push("/coach/exercises/lesson-plan/create")}
          >
            Create Training Plan
          </AppButton>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-lg border bg-white p-4">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <AppInput placeholder="Search plans by name..." fullWidth />
          </div>

          <div className="flex items-center gap-2">
            {["All", "Active", "Draft", "Archived"].map((f) => (
              <button
                key={f}
                className="px-3 py-1 text-sm rounded border hover:bg-slate-50"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border px-2">
          <Table>
            <TableHeader>
              <TableRow className="text-slate-500">
                <TableHead>Plan Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Athletes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {plans.map((plan, index) => (
                <TableRow
                  key={plan.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  {/* Name */}
                  <TableCell>
                    <div className="font-medium">{plan.name}</div>
                    <div className="text-xs text-slate-500">
                      {plan.description}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(
                        plan.status,
                      )}`}
                    >
                      {plan.status}
                    </span>
                  </TableCell>

                  {/* Duration */}
                  <TableCell>
                    <div className="text-xs text-slate-500">
                      {diffInDays(plan.start_date, plan.end_date)} days
                    </div>
                  </TableCell>

                  {/* Athletes */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-semibold">
                          {getInitials(plan.creator?.name)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {plan.users.length === 0
                          ? "None assigned"
                          : `+${plan.users.length}`}
                      </div>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        className="text-slate-500 hover:text-slate-900 border-none"
                        variant="outline"
                        onClick={() => handleEditClick(plan.id)}
                      >
                        <Edit className="size-5" />
                      </Button>
                      <Button
                        className="text-red-500 hover:text-red-700 border-none"
                        variant="outline"
                        onClick={() => handleDeleteClick(plan.id)}
                        disabled={deletePlanMutation.isPending}
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {plans.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-slate-400"
                  >
                    No training plans found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Training Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this training plan? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedPlanId(null);
              }}
              disabled={deletePlanMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deletePlanMutation.isPending}
            >
              {deletePlanMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
