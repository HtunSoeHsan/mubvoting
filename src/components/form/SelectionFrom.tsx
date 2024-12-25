import React, { useState } from "react";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const SelectionForm: React.FC = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const [profile, setProfile] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setGallery(files);

      const urls = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews(urls);
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let profileUrl = null;
      if (profile) {
        profileUrl = await uploadFile(profile, `profiles/${profile.name}`);
      }

      const galleryUrls = await Promise.all(
        gallery.map((file, index) =>
          uploadFile(file, `gallery/${name}_${index}_${file.name}`)
        )
      );

      const selectionData = {
        name,
        gender,
        profile: profileUrl,
        gallery: galleryUrls,
        king: 0,
        queen: 0,
        popular: 0,
        innocent: 0,
        createdAt: new Date(),
      };

      console.log("selection", selectionData);
      await addDoc(collection(db, "selections"), selectionData);

      alert("Data successfully uploaded!");
      setName("");
      setProfile(null);
      setGallery([]);
      setProfilePreview(null);
      setGalleryPreviews([]);
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("Failed to upload data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-md shadow"
    >
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700"
        >
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="profile-upload"
          className="block text-sm font-medium text-gray-700"
        >
          Profile Picture
        </label>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="hidden"
            />
            <label
              htmlFor="profile-upload"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Upload Profile Picture
            </label>
          </div>
          {profilePreview && (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-md border"
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="gallery-upload"
          className="block text-sm font-medium text-gray-700"
        >
          Gallery
        </label>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input
              id="gallery-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="hidden"
            />
            <label
              htmlFor="gallery-upload"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Upload Images
            </label>
          </div>
          {galleryPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {galleryPreviews.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Gallery Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default SelectionForm;
