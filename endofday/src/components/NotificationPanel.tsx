// "use client";
// import Image from "next/image";
// import Heading from "@/components/ui/Heading";

// interface NotificationItem {
//   id: number;
//   profileUrl: string;
//   text: string;
//   unread: boolean;
// }

// interface NotificationPanelProps {
//   notifications: NotificationItem[];
//   filter: "all" | "unread";
//   onFilter: (filter: "all" | "unread") => void;
//   onClickNotification: (id: number) => void;
//   isNotificationEnabled: boolean;
//   setIsNotificationEnabled: (val: boolean) => void;
// }

// export default function NotificationPanel({
//   notifications,
//   filter,
//   onFilter,
//   onClickNotification,
//   isNotificationEnabled,
//   setIsNotificationEnabled,
// }: NotificationPanelProps) {
//   // 스위치 ON/OFF
//   const onOffLabel = isNotificationEnabled ? "ON" : "OFF";

//   return (
//     <div>
//       {/* 상단 헤더 + 알림 on/off 스위치 */}
//       <div className="flex items-center justify-between mb-3 p-2 rounded">
//         <Heading tag="h2" className="text-xl font-bold">
//           알림
//         </Heading>
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-bold">{onOffLabel}</span>
//           <label className="inline-flex relative items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={isNotificationEnabled}
//               onChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
//               className="sr-only peer"
//             />
//             <div
//               className="
//               w-8 h-4 bg-gray-200 peer-focus:outline-none
//               peer-focus:ring-1 peer-focus:ring-blue-300
//               rounded-full border border-blue-300/60
//               peer-checked:after:translate-x-full peer-checked:after:border-white
//               after:content-[''] after:absolute after:top-[2px] after:left-[2px]
//               after:bg-white after:border-gray-300 after:border after:rounded-full
//               after:h-3 after:w-3 after:transition-all
//               peer-checked:bg-blue-400
//             "
//             />
//           </label>
//         </div>
//       </div>

//       {/* 필터 버튼 */}
//       <div className="flex gap-4 mb-3">
//         <button
//           className={`px-3 py-1 text-sm ${
//             filter === "all" ? "text-blue-600 font-bold" : "hover:bg-gray-100"
//           }`}
//           onClick={() => onFilter("all")}
//         >
//           모두
//         </button>
//         <button
//           className={`px-3 py-1 text-sm ${
//             filter === "unread"
//               ? "text-blue-600 font-bold"
//               : "hover:bg-gray-100"
//           }`}
//           onClick={() => onFilter("unread")}
//         >
//           읽지않음
//         </button>
//       </div>

//       {/* 알림 목록 */}
//       <ul className="space-y-2">
//         {notifications.map((item) => (
//           <li
//             key={item.id}
//             className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
//             onClick={() => onClickNotification(item.id)}
//           >
//             <Image
//               src={item.profileUrl}
//               alt="알림 프로필"
//               width={32}
//               height={32}
//               className="rounded-full"
//             />
//             <div className="flex-1 ml-2 text-sm">{item.text}</div>
//             {item.unread && (
//               <span className="w-2 h-2 rounded-full bg-blue-600 inline-block mr-1" />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
