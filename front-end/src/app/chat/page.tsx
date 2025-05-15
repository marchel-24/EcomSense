import { Suspense } from 'react';
import ChatClient from './ChatClient';

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat interface...</div>}>
      <ChatClient />
    </Suspense>
  );
}
