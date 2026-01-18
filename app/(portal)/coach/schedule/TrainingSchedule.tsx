"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg, DatesSetArg } from "@fullcalendar/core";

import { events } from "./(contants)/event.type";
import EventModal from "./EventModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { AppInput } from "@/shared/components/ui/input/AppInput";

const VIEW_OPTIONS = [
  { label: "Month", value: "dayGridMonth" },
  { label: "Week", value: "timeGridWeek" },
  { label: "Day", value: "timeGridDay" },
] as const;
export const EVENT_TYPES = [
  { label: "Match Day", value: "match", color: "bg-red-500" },
  { label: "Training", value: "training", color: "bg-blue-500" },
  { label: "Recovery", value: "recovery", color: "bg-green-500" },
  { label: "Testing", value: "test", color: "bg-yellow-500" },
] as const;

type EventType = (typeof EVENT_TYPES)[number]["value"];

export const EVENT_STYLE: Record<string, string> = {
  training: "bg-blue-100 text-blue-700",
  match: "bg-green-600 text-white",
  recovery: "bg-green-100 text-green-700",
  dayoff: "bg-gray-100 text-gray-500",
  travel: "bg-blue-200 text-blue-800",
  gym: "bg-blue-200 text-blue-800",
  prep: "bg-blue-100 text-blue-700",
  test: "bg-yellow-100 text-yellow-800",
  double: "bg-indigo-100 text-indigo-700",
  kickoff: "bg-red-100 text-red-600 text-[10px]",
};

type CalendarView = (typeof VIEW_OPTIONS)[number]["value"];

type ExtendedProps = {
  type: keyof typeof EVENT_STYLE;
  subtitle?: string;
};

export default function TrainingCalendar({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) {
  const calendarRef = useRef<FullCalendar | null>(null);

  const [currentView, setCurrentView] = useState<CalendarView>("dayGridMonth");
  const [currentTitle, setCurrentTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTypes, setActiveTypes] = useState<EventType[]>(
    EVENT_TYPES.map((t) => t.value)
  );
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleEventType = (type: EventType) => {
    setIsAllSelected(false);
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAllTypes = () => {
    if (isAllSelected) {
      setActiveTypes([]);
      setIsAllSelected(false);
    } else {
      setActiveTypes(EVENT_TYPES.map((t) => t.value));
      setIsAllSelected(true);
    }
  };

  // Gọi onFilterChange khi activeTypes hoặc isAllSelected thay đổi
  useEffect(() => {
    if (isAllSelected) {
      onFilterChange("all");
    } else if (activeTypes.length === 0) {
      onFilterChange("none");
    } else if (activeTypes.length === 1) {
      onFilterChange(activeTypes[0]);
    } else {
      onFilterChange("multiple");
    }
  }, [activeTypes, isAllSelected, onFilterChange]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesType =
        isAllSelected || activeTypes.includes(event.type as EventType);
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.subtitle &&
          event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesType && matchesSearch;
    });
  }, [activeTypes, isAllSelected, searchQuery]);

  const getApi = () => calendarRef.current?.getApi();

  const changeView = (view: CalendarView) => {
    const api = getApi();
    api?.changeView(view);
    setCurrentView(view);
  };

  const handlePrev = () => getApi()?.prev();
  const handleNext = () => getApi()?.next();
  const handleToday = () => getApi()?.today();

  const handleDatesSet = (arg: DatesSetArg) => {
    setCurrentTitle(arg.view.title);
  };

  const handleDateClick = () => {
    setIsModalOpen(true);
  };

  const renderEventContent = useCallback((arg: EventContentArg) => {
    const { type, subtitle } = arg.event.extendedProps as ExtendedProps;

    return (
      <div
        className={`w-full rounded-lg px-2 py-1 cursor-pointer ${
          EVENT_STYLE[type] ?? "bg-gray-400 text-white"
        }`}
      >
        <div className="font-semibold text-sm leading-tight">
          {arg.timeText && <span>{arg.timeText} </span>}
          {arg.event.title}
        </div>

        {subtitle && <div className="text-[10px] opacity-80">{subtitle}</div>}
      </div>
    );
  }, []);

  return (
    <>
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-4">
        {/* Navigation */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrev}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext}>
            <ChevronRight />
          </Button>
        </div>

        {/* Title */}
        <div className="text-lg font-semibold">{currentTitle}</div>

        <div className="flex gap-2">
          {VIEW_OPTIONS.map((view) => (
            <Button
              key={view.value}
              variant={currentView === view.value ? "outline" : "secondary"}
              onClick={() => changeView(view.value)}
            >
              {view.label}
            </Button>
          ))}
          {/* Add Event */}
          <Button onClick={() => setIsModalOpen(true)}>+ Add Event</Button>
        </div>
      </div>

      {/* ===== Event Type Filter ===== */}
      <div className="w-full flex items-center justify-between px-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {/* ---- All ---- */}
          <Badge
            variant={isAllSelected ? "default" : "outline"}
            className="px-4 py-1 cursor-pointer select-none"
            onClick={toggleAllTypes}
          >
            All
          </Badge>
          {/* ---- Event Types ---- */}
          {EVENT_TYPES.map((t) => {
            const isActive = activeTypes.includes(t.value);
            return (
              <Badge
                key={t.value}
                variant={isActive ? "default" : "outline"}
                className="px-4 py-1 cursor-pointer select-none"
                onClick={() => toggleEventType(t.value)}
              >
                <span
                  className={`mr-2 h-2 w-2 rounded-full inline-block ${
                    isActive ? t.color : "bg-gray-300"
                  }`}
                />
                {t.label}
              </Badge>
            );
          })}
        </div>
        <AppInput
          type="text"
          placeholder="Search events..."
          className="w-[200px] h-8 border border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          rightIcon={
            <SearchIcon size={16} className="text-gray-500 cursor-pointer" />
          }
        />
      </div>

      {/* ===== Calendar ===== */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        events={filteredEvents}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        datesSet={handleDatesSet}
        height="auto"
      />

      <EventModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
