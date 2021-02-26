%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% 松下ゼミ中間発表用スタイルファイル（2015/8/12)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\ProvidesClass{matsushita-zemi}[%
2015/08/12 v2.1 松下ゼミ用レポートスタイル]
\LoadClass[twoside,twocolumn]{jarticle}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% 各種サイズの設定
%--------------------------------------------------------------------------
% 用紙全体のレイアウト
%\topmargin = 6mm
\topmargin = -10mm
\headheight = 2em %0pt
\headsep = 1em%0pt
\topskip = 10pt
\oddsidemargin = -7mm
\evensidemargin = \oddsidemargin
\textwidth = 174mm
\textheight = 245mm
\parskip = 1pt
\parindent = 1zw
\abovecaptionskip = 0mm
\textfloatsep = 0pt
\columnsep = 7mm
%\figuresep = 1em
\textfloatsep = 1.5em plus 2pt
\floatsep = 1.5em plus 2pt
%\setlength\textfloatsep{1.5em plus 2pt}
\renewcommand\refname{\hspace{8.2em}参 考 文 献}
\def\jaffiliation{関西大学 総合情報学部}
\def\eaffiliation{Faculty of Informatics, Kansai University}
\def\|{\verb|}
\def\BibTeX{$\mathrm{B{\scriptstyle{IB}}}$\hspace{-.2em}\TeX}


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% ページ出力の再定義
% 1．出力位置の調整を \xoffset と \yoffset で設定できるよう
% にする．
% 2．下書き段階で，原稿に関する情報をヘッダ部に表示できるよ
% うにする．(この時，完成原稿の版面に影響を与えないようにす
% る．)
\newlength{\xoffset}
\newlength{\yoffset}
\newlength{\tmpmargin}
%\pagestyle{empty}
%--------------------------------------------------------------------------
% 下書きかどうかの変数設定
\newif\ifDRAFT \DRAFTfalse
%--------------------------------------------------------------------------
% 日付時間を計算するためのカウンタを定義
\newcount\DVItime
\newcount\hour
\newcount\minute
\newcount\tempmin
%--------------------------------------------------------------------------
% 位置に関する長さの変数
\newdimen\pagewidth
\newdimen\pageheight
\newdimen\@pph
\newdimen\@ppw
%--------------------------------------------------------------------------
% /opt/local/tex/lib/texmf/tex/latex2e/base/latex.ltx より
\def\@outputpage{%
\begingroup           % the \endgroup is put in by \aftergroup
  \let \protect \noexpand
  \@resetactivechars
  \@parboxrestore
  \shipout \vbox{%
    \set@typeset@protect
    \aftergroup \endgroup
    \aftergroup \set@typeset@protect
                                % correct? or just restore by ending
                                % the group?
  \if@specialpage
    \global\@specialpagefalse\@nameuse{ps@\@specialstyle}%
  \fi
  \if@twoside
    \ifodd\count\z@ \let\@thehead\@oddhead \let\@thefoot\@oddfoot
         %--------------------
         % 横方向の位置あわせ
         % masahide (Sun May 31 20:00:34 1998)
         \tmpmargin = \oddsidemargin
         \addtolength{\tmpmargin}{\xoffset}
         \let\@themargin\tmpmargin
         %\let\@themargin\oddsidemargin
         %--------------------
    \else \let\@thehead\@evenhead
         \let\@thefoot\@evenfoot 
         %--------------------
         % 横方向の位置あわせ
         % masahide (Sun May 31 20:00:34 1998)
         \tmpmargin = \evensidemargin
         \addtolength{\tmpmargin}{\xoffset}
         \let\@themargin\tmpmargin
         %\let\@themargin\evensidemargin
         %--------------------
    \fi
  \fi
  %------------------------------------------------------------
  % コンパイルした時間の計算
  \advance\@themargin0in \@pph\topmargin\advance\@pph 0in
  \@ppw\pagewidth \advance\@ppw 0mm
  \DVItime\time
  \hour\DVItime\divide\hour 60
  \tempmin\hour\multiply\tempmin 60
  \minute\DVItime\advance\minute-\tempmin
  %------------------------------------------------------------
  \reset@font
  \normalsize
  \baselineskip\z@skip \lineskip\z@skip \lineskiplimit\z@
    \@begindvi
    %--------------------
    % 縦方向の位置あわせ
    % masahide (Sun May 31 20:00:34 1998)
    \vskip \yoffset
    %--------------------
    %-------------------------------------------------------
    % 下書き時のヘッダ部の出力
    \ifDRAFT
    \vbox{\normalsize \baselineskip\z@ \lineskip\z@ 
      \vbox to0pt{\vss\hbox to\@ppw{\kern6mm{\footnotesize\tt%
            DRAFT:~%
            \ifx\nameofpaper\undefined\else%
            \nameofpaper:~%
            \fi
            \jobname.dvi:~%
            \ifx\RCSRevision\undefined\else%
            Rev.~\RCSRevision:~%
            \fi
            p.~\thepage:~%
            \number\year.\number\month.\number\day~%
            {\ifnum\hour<10 0\fi}\number\hour
            :{\ifnum\minute<10 0\fi}\number\minute \hfill}}}}
    \fi
    %-------------------------------------------------------
    \vskip \topmargin
    \moveright\@themargin \vbox {%
      \setbox\@tempboxa \vbox to\headheight{%
        \vfil
        \color@hbox
          \normalcolor
          \hb@xt@\textwidth {%
            \let \label \@gobble
            \let \index \@gobble
            \let \glossary \@gobble %% 21 Jun 91
            \@thehead
            }%
        \color@endbox
        }%                        %% 22 Feb 87
      \dp\@tempboxa \z@
      \box\@tempboxa
      \vskip \headsep
      \box\@outputbox
      \baselineskip \footskip
      \color@hbox
        \normalcolor
        \hb@xt@\textwidth{%
          \let \label \@gobble
          \let \index \@gobble      %% 22 Feb 87
          \let \glossary \@gobble   %% 21 Jun 91
          \@thefoot
          }%
      \color@endbox
      }%
    }%
\global \@colht \textheight
\stepcounter{page}%
\let\firstmark\botmark
}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% タイトル部定義
%---------------------------------------------------------------------------
% タイトル用の新しいマクロ
\def\title#1{\gdef\@jtitle{#1}}
\def\idnum#1{\gdef\@idnum{#1}}
\def\author#1{\gdef\@author{#1}}
%\def\jaffiliation#1{\gdef\@jaffiliation{#1}}
%\def\eaffiliation#1{\gdef\@eaffiliation{#1}}

\def\ps@headings{%
\def\@evenhead{%
\hskip 4.8cm \it Matsushita Lab., Faculty of Informatics, Kansai Univ.\\}
\def\@oddhead{%
\hskip 4.8cm \it Matsushita Lab., Faculty of Informatics, Kansai Univ.\\}
}
\pagestyle{headings}

%---------------------------------------------------------------------------

%---------------------------------------------------------------------------
% \maketitleを再定義
\def\maketitle{
% twocolumn環境でonecolumnにするため
\twocolumn[
\begin{titlepage}
% ページスタイルをページ番号などがつかない形にする
\thispagestyle{empty}
%------------------------------
\begin{center}
  \null
  \vskip -14mm
%------------------------------
% title 部
  {\Large\bf
    \baselineskip = 18pt
    \@jtitle
    \par}
%  \vskip 2mm
%%   {\normalsize
%%     \baselineskip = 14pt
%%     \@etitle
%%     \par}
  \vskip 1.5mm plus 2mm
%------------------------------
% author 部
  {%\small
    \baselineskip = 15pt
    \vskip 0.5em  \normalsize  \@idnum \hskip 1.2em \large \@author \par \vskip 0.5em}%
%------------------------------
% affiliation 部
  {%\small
    %\large
    \baselineskip = 12pt
    %\@jaffiliation
    関西大学 総合情報学部 松下研究室
%    \par
%    関西大学 総合情報学部%    \@eaffiliation
    \par}
\end{center}
\vskip -1em
\null
\end{titlepage}]
%==========================================================================
% 本文のパラメータの定義
%--------------------------------------------------------------------------
% 改行幅
\footnotesize
\setlength{\baselineskip}{4.94651162mm}
\setlength{\abovedisplayskip}{5pt} % 上部のマージン
\setlength{\belowdisplayskip}{5pt} % 下部のマージン
}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% section 関係再定義
\renewcommand{\section}{\@startsection{section}{1}{\z@}%
  {2ex plus 1ex minus .5ex}%
%  {.1ex plus 1ex minus .3ex}%
  {1ex plus 1ex minus .3ex}%
  {\reset@font\footnotesize\bfseries\large}}

\renewcommand{\subsection}{\@startsection{subsection}{2}{\z@}%
  {1.3ex plus 1ex minus .5ex}%
%  {.1ex plus 1ex minus .3ex}%
  {1ex plus 1ex minus .3ex}%
  {\reset@font\footnotesize\bfseries\large}}

\renewcommand{\subsubsection}{\@startsection{subsubsection}{3}{\z@}%
  {1.2ex plus 1ex minus .5ex}%
  {0.6ex plus 1ex minus .3ex}%
  {\reset@font\footnotesize\bfseries}}

\def\thesection {\arabic{section}}
\def\thesubsection {\thesection.\arabic{subsection}}
\def\thesubsubsection {\thesubsection.\arabic{subsubsection}}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% 数式・リスト (参考文献) のレイアウト
% 本文が footnotesize になっているので以下で再定義する．
% 参照：/opt/local/tex/lib/texmf/tex/platex2e/base/jsize12.clo
\renewcommand{\footnotesize}{%
  \@setfontsize\footnotesize\@xpt\@xiipt
  %----------------------------------------
  % 数式の上下で文章との間隔を決定する．
  \abovedisplayskip \z@ \@plus2\p@
  \belowdisplayskip \abovedisplayskip
  \abovedisplayshortskip \abovedisplayskip
  \belowdisplayshortskip \abovedisplayskip
  %----------------------------------------
  %----------------------------------------
  % リスト (参考文献) 環境でリストの間隔を決定する．
  \def\@listi{\leftmargin\leftmargini
              \topsep \z@
              \parsep \z@
              \itemsep \parsep}%
  %----------------------------------------
  }
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% キャプションの文字サイズ変更
% /opt/local/tex/lib/texmf/tex/platex2e/base/jarticle.cls
\long\def\@makecaption#1#2{%
  \vskip\abovecaptionskip
  \iftdir\sbox\@tempboxa{#1\hskip1em#2}%
    %----------------------------------------
    % 本文に合わせてキャプションを \footnotesize にする
    \else\sbox\@tempboxa{\footnotesize #1: #2}%
    %----------------------------------------
  \fi
  \ifdim \wd\@tempboxa >\hsize
    \iftdir #1\hskip1em#2\relax\par
      %----------------------------------------
      % 本文に合わせてキャプションを \footnotesize にする
      \else {\footnotesize #1: #2}\relax\par\fi
      %----------------------------------------
  \else
    \global \@minipagefalse
    \hbox to\hsize{\hfil\box\@tempboxa\hfil}%
  \fi
  \vskip\belowcaptionskip}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
