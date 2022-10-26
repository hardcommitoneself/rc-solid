import { createContextProvider } from "@solid-primitives/context";
import { Component, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { CompactProfile } from "./user";

export type ChatMessage = {
    id: number;
    profile: CompactProfile;
    content: string;
}

const [ChatProvider, useChat] = createContextProvider(
    () => {
        const [opened, setOpened] = createSignal<boolean>(true);
        const [messages, setMessages] = createStore<ChatMessage[]>([]);
          
        const toggleChat = () => setOpened(!opened());
        const addMessage = (message: ChatMessage) => {
            setMessages((prev) => [...prev, message]);
        };

        return {
            opened,
            messages,
            addMessage,
            toggleChat
        };
    }
);

export { ChatProvider, useChat };