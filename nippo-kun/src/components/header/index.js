import React from 'react';
import './index.css'; // スタイリングのためのCSSファイルをインポート

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">にっぽーくん</h1>
      <nav className="header-nav">
        <ul>
          <li><a href="#home">昨日立てた予定</a></li>
          <li><a href="#about">・Atcoder</a></li>
          <li><a href="#contact">・提出クエスト</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
