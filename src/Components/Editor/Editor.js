import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { useFirestore } from "../Firebase/Firebase";
import { useNotes } from "../../Context/NotesProvider";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../App.css";
import "./Editor.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useEditorContext } from "../../Context/EditorProvider";

function Editor({ classes }) {
  const { selectNote, tagOptions } = useNotes();

  const {
    text,
    setText,
    title,
    setTitle,
    tag,
    setTag,
    pinned,
    setPinned,
    newTag,
    setNewTag,
    handleChange,
    handleNewTag,
    handlePinned,
    deleteNote,
    modules,
  } = useEditorContext();

  useEffect(() => {
    setTitle(selectNote.data.title);
    setText(selectNote.data.body);
    setTag(selectNote.data.tag);
    setPinned(selectNote.data.pinned);
  }, [selectNote]);

  useEffect(() => {
    console.log("timeout");
    const timeout = setTimeout(() => {
      if (text) {
        console.log("timeout");
        useFirestore.collection("notes").doc(selectNote.id).update({
          body: text,
          title: title,
        });
      }
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, title]);

  return (
    <div className={classes.editor}>
      <div className="editor-container">
        <div className={classes.editorHeading}>
          <div className={classes.editorTitle}>
            <div>
              <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            </div>
            <div>
              <input
                className={classes.titleInput}
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <ReactQuill
          value={text}
          onChange={(val) => setText(val)}
          modules={modules}
        ></ReactQuill>
      </div>
      <div className={classes.editorFooter}>
        <div className="editor-tags desktop">
          <div className="tags">
            <LocalOfferIcon style={{ padding: "0px" }} />
            <FormControl
              style={{ paddingLeft: "5%", width: "25%", marginTop: "-3%" }}
            >
              <InputLabel htmlFor="uncontrolled-native">Tag</InputLabel>
              <NativeSelect onChange={handleChange}>
                <option>{tag}</option>
                {tagOptions.data.tags &&
                  tagOptions.data.tags.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
              </NativeSelect>
            </FormControl>

            <Input
              placeholder="New Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              style={{ marginLeft: "7%" }}
            />
            {newTag && (
              <Button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  marginLeft: "2%",
                }}
                onClick={handleNewTag}
              >
                Add
              </Button>
            )}
          </div>
          <div>
            {pinned ? (
              <div className="pinned">
                <BookmarkIcon onClick={handlePinned} /> <p>Pinned</p>
              </div>
            ) : (
              <div className="pinned">
                <BookmarkBorderIcon onClick={handlePinned} /> <p>Pin</p>
              </div>
            )}
          </div>
        </div>
        <div className="delete-content desktop">
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => deleteNote(selectNote)}
            style={{ padding: "2% 3%" }}
          ></DeleteIcon>{" "}
          Move to Trash
        </div>

        <div className="mobile editor-footer">
          <div className="editor-tags ">
            <div className="tags">
              <LocalOfferIcon style={{ padding: "0px" }} />
              <FormControl
                style={{ paddingLeft: "0%", width: "30%", marginTop: "-3%" }}
              >
                <InputLabel htmlFor="uncontrolled-native"></InputLabel>
                <NativeSelect onChange={handleChange}>
                  <option>{tag}</option>
                  {tagOptions.data.tags &&
                    tagOptions.data.tags.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                </NativeSelect>
              </FormControl>

              <Input
                placeholder="New Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                style={{ width: "40%", marginLeft: "3%" }}
              />
              {newTag && (
                <Button
                  disabled={true}
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={() => {
                    handleNewTag();
                  }}
                >
                  Add
                </Button>
              )}
            </div>
          </div>
          <div className="delete-content mobile">
            <div>
              {pinned ? (
                <div className="pinned">
                  <BookmarkIcon onClick={handlePinned} />
                </div>
              ) : (
                <div className="pinned">
                  <BookmarkBorderIcon onClick={handlePinned} />
                </div>
              )}
            </div>
            <div>
              <DeleteIcon
                className={classes.deleteIcon}
                onClick={() => deleteNote(selectNote)}
                style={{ marginTop: "10%" }}
              ></DeleteIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Editor);
