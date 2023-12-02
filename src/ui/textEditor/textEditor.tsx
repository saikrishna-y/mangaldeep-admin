import React from 'react'
import { Box } from '@mui/material'

// import { makeStyles } from '@material-ui/core/styles'

// import { EditorState, convertToRaw } from 'draft-js'

// import { Editor } from 'react-draft-wysiwyg'

// import draftToHtml from 'draftjs-to-html'

// const EditorFixed = Editor as any

// const useStyles = makeStyles({
//   editor_wrapper: {
//     border: '1px solid #F1F1F1'
//   },
//   toolbar: {
//     display: 'flex',
//     border: '1px solid #F1F1F1',
//     padding: '5px',
//     width: '100%',
//     flexWrap: 'wrap',
//     background: '#F6F6F6',
//     '& .rdw-inline-wrapper, .rdw-editor-toolbar, .rdw-list-wrapper, .rdw-text-align-wrapper, .rdw-link-wrapper, .rdw-history-wrapper':
//     {
//       /* Customize the toolbar styles */
//       display: 'flex',
//       justifyContent: 'space-between',
//       cursor: 'pointer'
//     },
//     '& .rdw-option-wrapper,.rdw-block-wrapper, .rdw-fontsize-wrapper, .rdw-fontfamily-wrapper': {
//       /* Customize the inline wrapper styles */
//       padding: '5px',
//       margin: '5px 10px 5px 0px',
//       cursor: 'pointer'
//     }
//   },
//   editor: {
//     background: '#ffffff',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px #F6F6F6',
//     minHeight: '50px',
//     padding: '5px'
//   }
// })

interface EditorProps {
  register?: any
  data: { name: string; }
  setValue?: any
}

const TextEditor = ({ data }: EditorProps) => {

  console.log('ksdfkjfdksajfd', data.name, typeof data.name)

  // const classes = useStyles()

  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  // const onEditorStateChange = (editorState: EditorState) => {
  //   setEditorState(editorState)
  //   const text = editorState.getCurrentContent()
  //   console.log('fjsafkjafdklk', text)
  //   const rawContentState = convertToRaw(text)
  //   console.log('rawContentState', rawContentState)
  //   const markup = draftToHtml(rawContentState)
  //   console.log('fksjdfkdfkjksd', markup)
  //   if (data && data?.name) {
  //     setValue(`${data?.name}`, markup)
  //   }
  // }

  return (
    <Box>

      {/* {
        window !== undefined
        && <EditorFixed
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName={classes.editor_wrapper}
          toolbarClassName={classes.toolbar}
          editorClassName={classes.editor}
          placeholder='Enter text'
          {...register(`${data?.name}`)}
        />
      } */}
    </Box>
  )
}

export default TextEditor
