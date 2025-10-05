"use";
// components/EditProfileModal.tsx
import { useState, ChangeEvent } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import Image from "next/image";
import { IUserAPP } from "../../../lib/Type_LIB/Type_lib";

interface EditProfileModalProps {
  user: IUserAPP;
  onClose: () => void;
  onUpdate: (data: IUserAPP, imageFile?: File) => Promise<boolean>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<IUserAPP>(user);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      user: {
        ...prev,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await onUpdate(
      { ...user, ...formData },
      selectedImage || undefined
    );
    setIsLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="Current Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <label className="cursor-pointer flex items-center text-blue-600">
              <FiUpload className="mr-2" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
