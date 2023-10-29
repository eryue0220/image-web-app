import PropTypes from 'prop-types';
import { shape } from '../../constants';
import './index.css';

export default function Tool({
  paintShape,
  paintOpacity,
  prevOpacity,
  setPaintOpacity,
  setPaintShape,
}) {
  return (
    <ul className="tool">
      <li className="tool-item">
        <p>Width</p>
        <input
          type="number"
          min={0}
          max={shape.width}
          value={paintShape.width}
          onChange={(e) => {
            setPaintShape({ ...paintShape, width: e.target.value });
          }}
        />
      </li>
      <li className="tool-item">
        <p>Height</p>
        <input
          type="number"
          min={0}
          max={shape.height}
          value={paintShape.height}
          onChange={(e) => {
            setPaintShape({ ...paintShape, height: e.target.value });
          }}
        />
      </li>
      <li className="tool-item">
        <p>Opacity</p>
        <input
          type="number"
          min={0}
          step={0.1}
          max={1}
          value={paintOpacity || prevOpacity}
          onChange={(e) => setPaintOpacity(e.target.value)}
        />
      </li>
    </ul>
  );
}

Tool.propTypes = {
  paintShape: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  paintOpacity: PropTypes.number,
  prevOpacity: PropTypes.number,
  setPaintOpacity: PropTypes.func.isRequired,
  setPaintShape: PropTypes.func.isRequired,
};
