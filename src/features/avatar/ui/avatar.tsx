import { useAvatarState } from "../model/use-avatar-state";

const Avatar = () => {
  const { data } = useAvatarState();

  if (!data) {
    return null;
  }
  return (
    <div className="flex items-center">
      <img
        src={data?.avatar}
        alt={data?.name}
        className="w-10 h-10 rounded-full object-cover border border-gray-200"
      />
    </div>
  );
};

export default Avatar;
