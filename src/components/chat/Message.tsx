import { levelToColor } from "src/experience";
import { ChatMessage, useChat } from "src/store/chat";
import { darken } from 'polished';

const Message = ({ profile, content }: ChatMessage) => {

    const color = levelToColor(profile.level);

    return (
        <div class="p-3">
            <div class="flex items-center space-x-1.5">
                <img src={profile.avatar} class=" rounded-full w-7 h-7 shadow" />
                <span class="flex-shrink-0 rounded px-1.5 py-0.5 tracking-wide font-medium text-sm" style={{background: `linear-gradient(to top, ${darken(0.1, color)}, ${color})`}}>{profile.level}</span>
                <span class="font-medium">{profile.username}</span>
            </div>
            <div class="mt-2 text-gray-200">{content}</div>
        </div>
    )
}

export default Message;