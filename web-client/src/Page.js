import { useCallback, useEffect, useRef, useState } from 'react';
import { shape } from './constants';
import { save } from './services/save';
import { PaintBoard, Tool, Upload } from './components';
import './Page.css';

export default function Page() {
  const [uploadImage, setUploadImage] = useState(null);
  const [paintShape, setPaintShape] = useState(shape);
  const [paintOpacity, setPaintOpacity] = useState(0.5);
  const [prevOpacity, setPrevOpacity] = useState(0.5);
  const [showMask, setMaskDisplay] = useState(true);

  const imageRef = useRef();
  const paintRef = useRef();

  const composition = useCallback(() => {
    const cs = document.createElement('canvas');
    const ctx = cs.getContext('2d');
    cs.width = shape.width;
    cs.height = shape.height;

    ctx.drawImage(imageRef.current, 0, 0, shape.width, shape.height);
    if (showMask) {
      ctx.drawImage(paintRef.current, 0, 0, paintShape.width, paintShape.height);
    }

    return cs.toDataURL('image/png', shape.height / shape.width);
  }, [paintShape, showMask]);

  const onSave = useCallback(async () => {
    if (uploadImage) {
      await save(uploadImage);
    }
  }, [uploadImage]);

  const onDownload = useCallback((filename) => {
    const a = document.createElement('a');
    const url = composition();
    a.href = url;
    a.download = filename || `${Date.now()}_img.png`;
    a.dispatchEvent(new MouseEvent('click'));
  }, [composition]);

  useEffect(() => {
    if (uploadImage) {
      const img = new Image();
      const ctx = imageRef.current.getContext('2d');
      img.src = URL.createObjectURL(uploadImage);
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [uploadImage]);

  return (
    <div className="page">
      <div className="nav">
        {uploadImage
          ? <Tool
              paintShape={paintShape}
              paintOpacity={paintOpacity}
              prevOpacity={prevOpacity}
              setPaintOpacity={setPaintOpacity}
              setPaintShape={setPaintShape}
            />
          : null
        }
        <p className="save" onClick={onSave}>Save</p>
        <p className="download" onClick={() => onDownload()}>Download</p>
        {uploadImage
          ? <p className="toggle-mask" onClick={() => {
              if (showMask) {
                setMaskDisplay(false);
                setPrevOpacity(paintOpacity);
                setPaintOpacity(0);
              } else {
                setMaskDisplay(true);
                setPaintOpacity(prevOpacity);
              }
            }}>
              {showMask ? 'Hide Mask' : 'Show Mask'}
            </p>
          : null
        }
      </div>
      {uploadImage
        ? <PaintBoard
            imageRef={imageRef}
            paintOpacity={paintOpacity}
            paintRef={paintRef}
            paintShape={paintShape}
            showMask={showMask}
          />
        : <Upload onUpload={setUploadImage} />
      }
    </div>
  );
}
