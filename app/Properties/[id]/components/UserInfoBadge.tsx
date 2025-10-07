"use client";

interface Props {
  currentUser?: { name?: string | null; email?: string | null; image?: string | null };
}

const UserInfoBadge = ({ currentUser }: Props) => {
  if (!currentUser) return null;

  const initials = currentUser.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="px-4 sm:px-6 pb-4">
      <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
        {currentUser.image ? (
          <img
            src={currentUser.image}
            alt={currentUser.name || "User"}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
          <p className="text-xs text-gray-600 truncate">{currentUser.email}</p>
        </div>
        <div className="text-xs text-green-600 font-medium flex-shrink-0">✓ Verified</div>
      </div>
    </div>
  );
};

export default UserInfoBadge;
