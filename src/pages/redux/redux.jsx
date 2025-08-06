import React, { useState } from "react";
import {
  useAddDataMutation,
  useAddImageMutation,
  useDeleteDataMutation,
  useDeleteImageMutation,
  useEditDataMutation,
  useGetDataQuery,
} from "../../services/storeRedux";
import { Modal, Button } from "antd";
import { FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";

const Redux = () => {
  const { data, refetch } = useGetDataQuery();

  const [addUser] = useAddDataMutation();
  const [deleteData] = useDeleteDataMutation();
  const [editData] = useEditDataMutation();
  const [addImage] = useAddImageMutation();
  const [deleteImage] = useDeleteImageMutation();

  // add
  let [inpAddName, setInpAddName] = useState("");
  let [inpAddDescription, setInpAddDescription] = useState("");
  let [inpAddImages, setInpAddImages] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function addNewUser(e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append("Name", inpAddName);
    formData.append("Description", inpAddDescription);
    if (inpAddImages && inpAddImages.length > 0) {
      inpAddImages.forEach((file) => {
        formData.append("Images", file);
      });
    }

    try {
      await addUser(formData);
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  // delete
  async function killUser(id) {
    try {
      await deleteData(id);
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  // edit
  let [inpEditName, setInpEditName] = useState("");
  let [inpEditDescription, setInpEditDescription] = useState("");
  let [idx, setIdx] = useState(null);

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  function openEditDialog(e) {
    setInpEditName(e.name);
    setInpEditDescription(e.description);
    setIdx(e.id);
    setIsModalOpenEdit(true);
  }

  async function edit() {
    try {
      await editData({
        name: inpEditName,
        description: inpEditDescription,
        id: idx,
      });
      refetch();
      setIsModalOpenEdit(false);
    } catch (error) {
      console.error(error);
    }
  }

  // addImage
  const [isModalOpenImage, setIsModalOpenImage] = useState(false);

  const handleCancelImage = () => {
    setIsModalOpenImage(false);
  };

  let [inpAddImageInImages, setInpAddImageInImages] = useState(null);
  let [idImage, setIdImage] = useState(null);

  async function addNewImage(e) {
    e.preventDefault();
    let formData = new FormData();
    if (inpAddImageInImages && inpAddImageInImages.length > 0) {
      inpAddImageInImages.forEach((file) => {
        formData.append("Images", file);
      });
    }
    try {
      await addImage({ id: idImage, form: formData });
      refetch();
      setIsModalOpenImage(false);
    } catch (error) {
      console.error(error);
    }
  }

  // deleteImage
  async function killImage(id) {
    try {
      await deleteImage(id);
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* // add  */}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={addNewUser} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name..."
            value={inpAddName}
            onChange={(e) => setInpAddName(e.target.value)}
            className="p-2 rounded-lg border-1 border-gray-300 outline-none focus:border-blue-500 hover:border-blue-500 transition-colors delay-75"
          />
          <input
            type="text"
            placeholder="Description..."
            value={inpAddDescription}
            onChange={(e) => setInpAddDescription(e.target.value)}
            className="p-2 rounded-lg border-1 border-gray-300 outline-none focus:border-blue-500 hover:border-blue-500 transition-colors delay-75"
          />
          <input
            type="file"
            placeholder="Images..."
            multiple
            onChange={(e) => setInpAddImages(Array.from(e.target.files))}
            className="p-2 rounded-lg border-1 border-gray-300 outline-none focus:border-blue-500 hover:border-blue-500 transition-colors delay-75"
          />
          <Button type="primary" htmlType="submit" className="mt-4 !py-5">
            Submit
          </Button>
        </form>
      </Modal>

      {/* // edit */}
      <Modal
        title="Edit"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpenEdit}
        onOk={handleCancelEdit}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <article className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name..."
            value={inpEditName}
            onChange={(e) => setInpEditName(e.target.value)}
            className="p-2 rounded-lg border-1 border-gray-300 outline-none focus:border-blue-500 hover:border-blue-500 transition-colors delay-75"
          />
          <input
            type="text"
            placeholder="Description..."
            value={inpEditDescription}
            onChange={(e) => setInpEditDescription(e.target.value)}
            className="p-2 rounded-lg border-1 border-gray-300 outline-none focus:border-blue-500 hover:border-blue-500 transition-colors delay-75"
          />
          <Button
            type="primary"
            htmlType="submit"
            onClick={edit}
            className="mt-4 !py-5"
          >
            Submit
          </Button>
        </article>
      </Modal>

      {/* // addImage  */}
      <Modal
        title="Image Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpenImage}
        onOk={handleCancelImage}
        onCancel={handleCancelImage}
        footer={null}
      >
        <form onSubmit={addNewImage} className="flex flex-col gap-3">
          <input
            type="file"
            placeholder="Image..."
            multiple
            onChange={(e) => setInpAddImageInImages(Array.from(e.target.files))}
            className="p-2 rounded-lg border-1 border-gray-300 outline-none focus:border-blue-500 hover:border-blue-500 transition-colors delay-75"
          />
          <Button type="primary" htmlType="submit" className="mt-3 !py-5">
            Submit
          </Button>
        </form>
      </Modal>

      <section className="grid md:grid-cols-4 gap-5 mt-10">
        {data?.data.map((e) => (
          <article
            key={e.id}
            className="flex flex-col gap-3 items-center p-5 rounded-lg shadow-lg relative"
          >
            <h2 className="font-bold text-lg ">{e.name}</h2>
            <p className="font-semibold">{e.description}</p>
            <div className="grid grid-cols-3 gap-5 w-full">
              {e.images.map((image) => (
                <div
                  key={image.id}
                  className="w-full mx-auto relative flex flex-col items-center gap-1"
                >
                  <img
                    className="rounded-2xl h-[100px]"
                    src={`http://37.27.29.18:8001/images/${image.imageName}`}
                    alt={image.id}
                  />
                  <TiDeleteOutline
                    onClick={() => killImage(image.id)}
                    className="cursor-pointer transition-colors hover:text-red-600 delay-100 text-xl"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 absolute top-3 right-3">
              <FaRegTrashAlt
                onClick={() => killUser(e.id)}
                className="cursor-pointer transition-colors hover:text-red-600 delay-100 text-xl"
              />
              <FaPenToSquare
                onClick={() => openEditDialog(e)}
                className="cursor-pointer transition-colors hover:text-blue-600 delay-100 text-xl"
              />
              <FaRegFileImage
                onClick={() => (setIsModalOpenImage(true), setIdImage(e.id))}
                className="cursor-pointer transition-colors hover:text-green-600 delay-100 text-xl"
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Redux;
