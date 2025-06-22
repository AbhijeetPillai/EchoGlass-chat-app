const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100/60 backdrop-blur-sm rounded-lg">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          {/* Avatar Skeleton */}
          <div className="chat-image avatar">
            <div className="size-10 rounded-full bg-base-300 animate-pulse" />
          </div>

          {/* Timestamp Placeholder */}
          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16 bg-base-300 rounded" />
          </div>

          {/* Message Bubble Skeleton */}
          <div className="chat-bubble bg-base-200 p-0 shadow-md">
            <div className="skeleton h-5 w-[180px] sm:w-[220px] rounded bg-base-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
