"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { Label } from "@/components/ui/label";
import { Check, FileEditIcon, PlusIcon, User } from "lucide-react";

export const EVENT_TYPES = [
  {
    label: "Match",
    dot: "bg-red-500",
    text: "text-red-600",
    border: "border-red-300",
  },
  {
    label: "Training",
    dot: "bg-blue-500",
    text: "text-blue-600",
    border: "border-blue-300",
  },
  {
    label: "Recovery",
    dot: "bg-green-500",
    text: "text-green-600",
    border: "border-green-300",
  },
  {
    label: "Testing",
    dot: "bg-yellow-500",
    text: "text-yellow-600",
    border: "border-yellow-300",
  },
  {
    label: "Meeting",
    dot: "bg-gray-400",
    text: "text-gray-600",
    border: "border-gray-300",
  },
];
const USERS = [
  { id: "1", name: "Alex Rivera", role: "Forward" },
  { id: "2", name: "Liam Smith", role: "Goalkeeper" },
];

function UserCard({
  user,
  selected,
  onClick,
}: {
  user: { id: string; name: string; role: string };
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-2 rounded-xl border p-2 transition
        ${
          selected
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:bg-gray-50"
        }`}
    >
      {/* Avatar */}
      <div className="relative">
        <div className="size-8 rounded-full bg-gray-300" />
        {selected && (
          <span className="absolute -bottom-1 -right-1 rounded-full bg-primary p-0.5">
            <Check className="size-3 text-white" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="text-left">
        <p
          className={`text-sm ${
            selected ? "font-semibold text-primary" : "font-medium"
          }`}
        >
          {user.name}
        </p>
        <p className="text-xs text-muted-foreground">{user.role}</p>
      </div>
    </button>
  );
}

export default function EventModal({
  open,
  onClose,
}: {
  readonly open: boolean;
  onClose: () => void;
}) {
  const [eventType, setEventType] = useState("Match");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>

        {/* Event title */}
        <div className="space-y-2">
          <AppInput
            label="Event Title"
            fullWidth
            placeholder="e.g. Tactical Analysis - UCL Prep"
          />
        </div>

        {/* Event type */}
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((t) => {
            const isSelected = eventType === t.label;

            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setEventType(t.label)}
                className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm border transition-colors
          ${
            isSelected
              ? `${t.text} ${t.border} font-bold`
              : "border-gray-200 text-gray-700 "
          } bg-white `}
              >
                <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Date & time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Range</label>
            <div className="flex items-center gap-2">
              <Input type="time" />
              <span className="text-sm text-muted-foreground">to</span>
              <Input type="time" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <AppInput
            label="Location"
            fullWidth
            placeholder="e.g. Training Pitch 1 / Meeting Room B"
          />
        </div>

        {/* Participation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Participation</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Invite whole squad
              </span>
              <Switch />
            </div>
          </div>

          <div className="flex gap-3">
            {USERS.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                selected={selectedUsers.includes(user.id)}
                onClick={() => toggleUser(user.id)}
              />
            ))}

            {/* Add more */}
            <Button
              type="button"
              variant="outline"
              className="h-16 flex items-center gap-2 text-gray-500 font-medium"
            >
              <PlusIcon className="size-4" />
              <User className="size-4" />
              Add More
            </Button>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Textarea placeholder="Additional details, equipment needed, or specific objectives..." />
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              className="  border border-primary text-primary"
              variant="outline"
            >
              <FileEditIcon size={6} />
              Build Training Plan
            </Button>
            <Button>Create Event</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
