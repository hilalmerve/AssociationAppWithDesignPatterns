import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { Announcement } from "../types";

/**
 * useWebSocket — yeni duyuru geldiğinde onYeniDuyuru callback'ini çağırır.
 *
 * Bağlantı: ws://localhost:8080/ws (SockJS fallback)
 * Topic:    /topic/duyurular
 *
 * Admin yeni duyuru kaydettiğinde backend bu kanala broadcast yapar,
 * hook da frontend state'ini güncellemek için callback'i tetikler.
 */
export function useWebSocket(onNewAnnouncement: (announcement: Announcement) => void) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/announcements", (message) => {
          const announcement: Announcement = JSON.parse(message.body);
          onNewAnnouncement(announcement);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}