import { useState } from "react";

function App() {
  // ------------get data are array
  const startNote = {
    content: "",
    author: "",
  };
  const [note, setNote] = useState(startNote);
  function onNoteValueChange(event) {
    const { name, value } = event.target; //name,value from event ที่ดึงมาจากข้างล่าง > set ค่าใหม่แต่ไม่ได้เก็บค่าเก่าไว้ก่อนจะพิมพ์ตัวต่อไป
    console.log(name, value);
    setNote((prevNote) => {
      return {
        // return ค่าใหม่กลับไป
        ...prevNote,
        [name]: value,
      };
    });
  }

  //   ----------------Add Note
  const [allNotes, setAllNotes] = useState([]);
  function onNoteSubmit(event) {
    event.preventDefault();
    setAllNotes((prevAllNotes) => {
      const newNote = { ...note };
      newNote.id = Date.now().toString();
      return [newNote, ...prevAllNotes]; //array ใหม่ต่อเก่า
    });

    setNote(startNote);
  }
  const noteELements = allNotes.map((theNote) => {
    return (
      <div
        key={theNote.id}
        className="flex justify-between py-1 px-2 mb-2 rounded-sm w-full bg-white bg-opacity-60"
      >
        <h5>{theNote.author}</h5>
        <div className="flex justify-end">
          <a
            href="#"
            className="border-2 border-yellow-600 text-yellow-600 px-2 rounded-sm hover:opacity-80 hover:text-white hover:bg-yellow-600 hover:border-yellow-600 transition duration-300 mr-1 text-xs"
            onClick={() => {
              setEditNote(theNote);
            }}
          >
            Edit
          </a>
          <a
            href="#"
            className="border-2 border-gray-400 text-gray-500 px-2 rounded-sm hover:opacity-80 hover:text-white hover:bg-green-700 hover:border-green-700 transition duration-300 text-xs"
            onClick={() => {
              onNoteDelete(theNote.id);
            }}
          >
            Complete
          </a>
        </div>
      </div>
    );
  });

  // --------------------Delete Note
  function onNoteDelete(noteId) {
    setAllNotes((prevAllNotes) => {
      //prevAllNotes = allNote
      return prevAllNotes.filter((theNote) => theNote.id !== noteId); //กรองอันที่ไม่ตรงแล้ว return เฉพาะอันที่ไม่ตรงออกไป
    });
  }

  // --------------------Edit Note
  const [editNote, setEditNote] = useState(null);
  let formEditNote = null;
  if (!!editNote) {
    formEditNote = (
      <div className="bg-black w-screen h-screen z-50 top-0 fixed bg-opacity-50 flex items-center">
        <form
          action=""
          className="flex flex-col items-center w-11/12 md:w-2/6 mx-auto"
          onSubmit={onEditNoteSubmit}
          noValidate
        >
          <input
            type="text"
            placeholder="enter additional note"
            name="author"
            onChange={onEditNoteValueChange}
            value={editNote.author}
            className="border-2 border-gray-500 container w-full mx-auto px-2 h-10 md:h-auto"
            required
          />
          <div className="self-end">
            <button
              className="self-end pb-1 my-3 mb-5 h-8 bg-red-400 text-white rounded-md  hover:bg-red-800 transition duration-300 mr-2 px-3"
              onClick={closeFormEditNote}
            >
              Cancle
            </button>
            <button
              type="submit"
              className="self-end pb-1 my-3 mb-5 h-8 bg-blue-400 text-white rounded-md  hover:bg-blue-800 transition duration-300 px-3"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    );
  }
  // type form editNote
  function onEditNoteValueChange(event) {
    const { name, value } = event.target; //name,value from event ที่ดึงมาจากข้างล่าง > set ค่าใหม่แต่ไม่ได้เก็บค่าเก่าไว้ก่อนจะพิมพ์ตัวต่อไป
    setEditNote((prevNote) => {
      return {
        // return ค่าใหม่กลับไป
        ...prevNote,
        [name]: value,
      };
    });
  }
  // function edit note
  function onEditNoteSubmit(event) {
    event.preventDefault();

    //setAllNotes = add each note
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.map((theNote) => {
        if (theNote.id !== editNote.id) return theNote;
        return editNote;
      });
    });

    //close popup form edit note
    setEditNote(null);
  }
  function closeFormEditNote(event) {
    event.preventDefault();
    setEditNote(null);
  }

  // ------------------------App
  return (
    <div className="flex flex-col items-center w-full pt-14 min-h-screen bg-gradient-to-r from-green-900 to-blue-400 ">
      <h3 className="text-3xl md:text-4xl mb-4 font-bold text-white">
        To Do List!
      </h3>
      <form
        action=""
        onSubmit={onNoteSubmit}
        className="flex h-10 justify-center items-center w-11/12 md:w-3/6"
      >
        <input
          type="text"
          placeholder="enter your activity"
          name="author"
          value={note.author}
          onChange={onNoteValueChange}
          className="mr-1 border-2 border-gray-500 container w-full mx-auto px-2 h-full"
          required
        />
        <button
          type="submit"
          className="font-bold self-end h-full bg-pink-400 text-white rounded-md w-4/12 md:w-2/12 hover:bg-pink-600 transition duration-500"
        >
          Add
        </button>
      </form>

      <div className="flex flex-col items-center w-11/12 md:w-3/6 mt-16">
        {noteELements}
      </div>
      {formEditNote}
    </div>
  );
}
export default App;
