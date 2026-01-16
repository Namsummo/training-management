"use client";

import React from "react";
import Image from "next/image";
import { AppButton } from "@/shared/components/ui/button/AppButton";

export default function ChatFeedBackPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Left: Conversations list */}
        <aside className="col-span-3 bg-white rounded-lg border p-4 shadow-sm h-[80vh] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold">Profile messages</div>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded bg-slate-100">⋯</button>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-2 bg-slate-100 rounded px-3 py-2">
              <select className="bg-transparent text-sm">
                <option>Grouped by</option>
              </select>
              <input placeholder="Search" className="ml-auto text-sm bg-transparent outline-none" />
            </div>
          </div>

          <div className="overflow-auto flex-1 space-y-3">
            {/* Unread */}
            <div className="text-xs text-slate-400">Unread</div>
            {["Sophia Wilson","John Doe","Emma Brown"].map((name, i) => (
              <div key={name} className="flex items-center justify-between p-2 rounded hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                    <Image src={`/images/avatar-${(i%3)+1}.png`} alt={name} width={40} height={40} className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{name}</div>
                    <div className="text-xs text-slate-400">{i===0? 'Helloo...' : i===1 ? 'Typing ...' : 'Hi Edwin...'}</div>
                  </div>
                </div>
                <div className="text-xs text-white bg-rose-500 rounded-full w-6 h-6 flex items-center justify-center">{i===0?3:1}</div>
              </div>
            ))}

            <div className="mt-4 text-xs text-slate-400">Favorite Messages</div>
            {[1,2,3].map((n)=> (
              <div key={n} className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-slate-100" />
                <div>
                  <div className="text-sm">John Doe</div>
                  <div className="text-xs text-slate-400">Hi Edwin...</div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Chat thread */}
        <main className="col-span-6 bg-white rounded-lg border shadow-sm flex flex-col h-[80vh]">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                <Image src="/images/avatar-1.png" alt="Sophia" width={40} height={40} className="object-cover" />
              </div>
              <div>
                <div className="font-medium">Sophia Wilson</div>
                <div className="text-xs text-slate-400">UI UX Designer</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded bg-slate-50">📞</button>
              <button className="p-2 rounded bg-slate-50">➕</button>
              <button className="p-2 rounded bg-slate-50">⋯</button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <div className="text-xs text-slate-400 text-center">Today</div>

            {/* incoming message */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                <Image src="/images/avatar-1.png" alt="Sophia" width={40} height={40} className="object-cover" />
              </div>
              <div className="bg-slate-100 p-4 rounded-lg max-w-[70%]">
                Hi Kevin,
                <div className="mt-2">Thank you for the opportunity! Yes, Thursday at 10:00 AM works perfectly for me. I'll be ready on Zoom. Appreciate your time and looking forward to speaking with you.</div>
                <div className="text-xs text-slate-400 mt-2">09.21 AM</div>
              </div>
            </div>

            {/* outgoing message */}
            <div className="flex items-start gap-4 justify-end">
              <div className="bg-white p-4 rounded-lg max-w-[70%] border">
                Hi Kevin,
                <div className="mt-2">Thank you for the opportunity! Yes, Thursday at 10:00 AM works perfectly for me. I'll be ready on Zoom. Appreciate your time and looking forward to speaking with you.</div>
                <div className="text-xs text-slate-400 mt-2">09.21 AM</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                <Image src="/images/avatar-4.png" alt="You" width={40} height={40} className="object-cover" />
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <input placeholder="Type a message..." className="flex-1 h-10 rounded-lg px-3 border bg-slate-50" />
              <button className="p-2 rounded bg-slate-50">📎</button>
              <button className="p-2 rounded bg-slate-50">😊</button>
              <AppButton className="bg-[#5954E6] text-white">Send</AppButton>
            </div>
          </div>
        </main>

        {/* Right: Context / info panel */}
        <aside className="col-span-3 bg-white rounded-lg border p-4 shadow-sm h-[80vh] overflow-auto">
          <div className="text-sm font-medium mb-4">Conversation Info</div>
          <div className="text-xs text-slate-500">Messages are end-to-end encrypted.</div>

          <div className="mt-6">
            <div className="text-sm font-medium">Recent Activity</div>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>Sophia replied to your message · 09:21 AM</li>
              <li>Marcus joined the channel · 08:10 AM</li>
            </ul>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium">Members</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100" />
                <div className="text-sm">Sophia Wilson</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100" />
                <div className="text-sm">You</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
