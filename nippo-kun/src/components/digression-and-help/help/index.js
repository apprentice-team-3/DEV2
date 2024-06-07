import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHelpMarkdown } from '../../../store';
import './index.css';

const Help = () => {
  const dispatch = useDispatch();
  const markdown = useSelector((state) => state.help.markdown);
  const html = useSelector((state) => state.help.html);

  const handleChange = (e) => {
    dispatch(setHelpMarkdown(e.target.value));
  };

  return (
    <div className="help__wrapper">
      <h2 className="help__title">相談</h2>
      <textarea
        className="help__textarea"
        value={markdown}
        onChange={handleChange}
        placeholder="気になることを入力してください"
      ></textarea>

      {/* テスト用 */}
      <div>
        <h3>（テスト用）Reduxに保存された内容：</h3>
        <div dangerouslySetInnerHTML={{ __html: html}} />
      </div>

    </div>
  );
};

export default Help;
