import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMarkdown, setHTML } from '../../store';
import './index.css';

const Digression = () => {
  const dispatch = useDispatch();
  const markdown = useSelector((state) => state.digression.markdown);
  const html = useSelector((state) => state.digression.html);

  const handleChange = (e) => {
    dispatch(setMarkdown(e.target.value));
  };

  return (
    <div className="digression__wrapper">
      <h2 className="digression__title">余談</h2>
      <textarea
        className="digression__textarea"
        value={markdown}
        onChange={handleChange}
        placeholder="余談を入力してください"
      ></textarea>

      {/* テスト用 */}
      <div>
        <h3>（テスト用）Reduxに保存された内容：</h3>
        <div dangerouslySetInnerHTML={{ __html: html}} />
      </div>

    </div>
  );
};

export default Digression;
