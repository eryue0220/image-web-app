import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { messages } from '../../constants';
import './index.css';

export default function Upload({ maxFileSizeInBytes, onUpload }) {
  const fileRef = useRef();

  const addNewFile = useCallback((files) => {
    for (const f of files) {
      if (f.size > maxFileSizeInBytes) {
        // max size
        alert(messages.maxSize);
        continue;
      } else if (!f.type.includes('image/')) {
        // Unsupported file type
        alert(messages.unsupported);
        continue;
      }

      return f;
    }
  }, [maxFileSizeInBytes]);

  const onNewFileUpload = useCallback((e) => {
    const { files } = e.target;
    if (files.length) {
      const updatedFile = addNewFile(files);
      if (updatedFile) {
        onUpload(updatedFile)
      }
    }
  }, [addNewFile, onUpload]);

  return (
    <div className="upload-area">
      <p>Click to Choose File</p>
      <input id="upload-content" type="file" onChange={onNewFileUpload} ref={fileRef} value="" />
    </div>
  );
}

Upload.defaultProps = {
  maxFileSizeInBytes: 1000000,
};

Upload.propTypes = {
  maxFileSizeInBytes: PropTypes.number,
  onUpload: PropTypes.func.isRequired,
};
