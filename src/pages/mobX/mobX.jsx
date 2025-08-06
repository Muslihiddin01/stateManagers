import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import todolist from "../../services/storeMobX";
import { FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { Button, Modal } from "antd";
const MobX = observer(() => {
  useEffect(() => {
    todolist.getToDos();
  }, []);

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
      await todolist.addToDos(formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (todolist.loading) return <p>Loading...</p>;
  if (todolist.error) return <p>Error</p>;
  return (
    <div>
      {/* // add  */}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Add Modal"
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

      <section className="grid md:grid-cols-4 gap-5 mt-10">
        {todolist?.data.map((e) => (
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
                  <TiDeleteOutline className="cursor-pointer transition-colors hover:text-red-600 delay-100 text-xl" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 absolute top-3 right-3">
              <FaRegTrashAlt
                onClick={() => todolist.deleteToDos(e.id)}
                className="cursor-pointer transition-colors hover:text-red-600 delay-100 text-xl"
              />
              <FaPenToSquare className="cursor-pointer transition-colors hover:text-blue-600 delay-100 text-xl" />
              <FaRegFileImage className="cursor-pointer transition-colors hover:text-green-600 delay-100 text-xl" />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
});

export default MobX;
