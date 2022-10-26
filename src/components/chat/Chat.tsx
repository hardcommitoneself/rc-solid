import { Accessor, createEffect, For, Match, Switch, useContext, on } from "solid-js";
import { useChat } from "src/store/chat";
import Footer from "./Footer";
import Message from "./Message";

const Chat = () => {
    let messagesDiv: HTMLDivElement | undefined;
    const { opened, messages, addMessage, toggleChat } = useChat()!;

    /*createEffect(() => {
        const k = messages;
        if (messagesDiv) {
            console.log(messagesDiv.scrollHeight)

            const scrollHeight = messagesDiv.scrollHeight;
            const height = messagesDiv.clientHeight;
            const maxScrollTop = scrollHeight - height;
            messagesDiv.scrollTop = maxScrollTop;
        }
    })*/

    createEffect(() => {
        console.log(messages.length)
        if (messagesDiv) {
            console.log(messagesDiv.scrollHeight)

            const scrollHeight = messagesDiv.scrollHeight;
            const height = messagesDiv.clientHeight;
            const maxScrollTop = scrollHeight - height;
            messagesDiv.scrollTop = maxScrollTop;
        }
    });


    function testMessage() {
        const now = +new Date();
        addMessage({
            id: now,
            content: now.toString(),
            profile: {
                id: 1,
                steamid: 'sadasd',
                username: 'foigjodifgj',
                avatar: 'https://avatars.steamstatic.com/6293098db568fafd849388410fdb075fd19e577a_full.jpg',
                level: 5,
                rank: 2
            }
        })
    }

    return (
        <>
            <div class="flex flex-col overflow-hidden absolute right-0 h-[calc(100%_-_7rem)] w-[var(--sidebar-width)] text-gray-100 border-l border-site-600 transform transition-transform" classList={{ "translate-x-[var(--sidebar-width)]": !opened() }}>
                <div>
                    chat
                    <button onClick={toggleChat}>close</button>
                    <button onClick={testMessage}>new message</button>
                </div>
                <div ref={messagesDiv} class="flex-grow overflow-y-scroll overflow-x-hidden">
                    <div class="flex flex-col">
                        <For each={messages}>
                            {(message) => <Message {...message} />}
                        </For>
                    </div>
                </div>
                <Footer />
            </div>
            <div class="absolute bottom-0 right-0" classList={{ "opacity-0": opened(), "opacity-100": !opened() }}>
                <button onClick={toggleChat}>open</button>
            </div>
        </>
    )
}

export default Chat;