interface IconsType {
    width?: string;
    height?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const SearchIcon: React.FC<IconsType> = ({ width, height, className, onClick }) => (
    <svg
        focusable="false"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 21 21"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <g strokeWidth="2" stroke="currentColor" fill="none" fillRule="evenodd">
            <path d="M19 19l-5-5" strokeLinecap="square"></path>
            <circle cx="8.5" cy="8.5" r="7.5"></circle>
        </g>
    </svg>
);

export const ChervonDonwIcon: React.FC<IconsType> = ({ width = '2.4rem', height = '2.4rem', className, style }) => (
    <svg
        className={className}
        width={width}
        height={height}
        style={style}
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path stroke="currentColor" strokeWidth="2" d="M10 2L6 6 2 2" strokeLinecap="square"></path>
    </svg>
);

export const ChervonUpIcon: React.FC<IconsType> = ({ width = '2.4rem', height = '2.4rem', className, style }) => (
    <svg
        focusable="false"
        className={className}
        width={width}
        height={height}
        style={style}
        viewBox="0 0 12 8"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path stroke="currentColor" strokeWidth="2" d="M10 2L6 6 2 2" fill="none" strokeLinecap="square"></path>
    </svg>
);

export const ChervonUpMenuIcon: React.FC<IconsType> = ({ width = '2.4rem', height = '2.4rem', className, style }) => (
    <svg
        focusable="false"
        className={className}
        width={width}
        height={height}
        style={style}
        viewBox="0 0 20 9"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g fill="none" fillRule="evenodd">
            <path
                d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                fill="#ffffff"
            ></path>
            <path
                d="M-.00922471 9C1.38887087 7.61849126 4.26661926 4.80337304 8.62402045.5546454c.75993175-.7409708 1.98812015-.7393145 2.74596565.0037073L19.9800494 9h-1.3748787l-7.9226239-7.7676545c-.3789219-.3715101-.9930172-.3723389-1.3729808-.0018557-3.20734177 3.1273507-5.6127118 5.4776841-7.21584193 7.05073579C1.82769633 8.54226204 1.58379521 8.7818599 1.36203986 9H-.00922471z"
                fill="#dfcc8e"
            ></path>
        </g>
    </svg>
);

export const UserIcon: React.FC<IconsType> = ({ width = '2.4rem', height = '2.4rem', className, style }) => (
    <svg
        className={className}
        width={width}
        height={height}
        style={style}
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 13c2.82 0 5.33.64 6.98 1.2A3 3 0 0 1 19 17.02V21H1v-3.97a3 3 0 0 1 2.03-2.84A22.35 22.35 0 0 1 10 13zm0 0c-2.76 0-5-3.24-5-6V6a5 5 0 0 1 10 0v1c0 2.76-2.24 6-5 6z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
        ></path>
    </svg>
);

export const CartIcon: React.FC<IconsType> = ({ width = '2.4rem', height = '2.4rem', className, style }) => (
    <svg
        className={className}
        width={width}
        height={height}
        style={style}
        viewBox="0 0 27 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g transform="translate(0 1)" strokeWidth="2" stroke="currentColor" fill="none" fillRule="evenodd">
            <circle strokeLinecap="square" cx="11" cy="20" r="2"></circle>
            <circle strokeLinecap="square" cx="22" cy="20" r="2"></circle>
            <path d="M7.31 5h18.27l-1.44 10H9.78L6.22 0H0"></path>
        </g>
    </svg>
);

export const SpinnerIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg
        focusable="false"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 64 64"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
    >
        <path
            opacity=".4"
            d="M23.8589104 1.05290547C40.92335108-3.43614731 58.45816642 6.79494359 62.94709453 23.8589104c4.48905278 17.06444068-5.74156424 34.59913135-22.80600493 39.08818413S5.54195825 57.2055303 1.05290547 40.1410896C-3.43602265 23.0771228 6.7944697 5.54195825 23.8589104 1.05290547zM38.6146353 57.1445143c13.8647142-3.64731754 22.17719655-17.89443541 18.529879-31.75914961-3.64743965-13.86517841-17.8944354-22.17719655-31.7591496-18.529879S3.20804604 24.7494569 6.8554857 38.6146353c3.64731753 13.8647142 17.8944354 22.17719655 31.7591496 18.529879z"
        ></path>
        <path d="M1.05290547 40.1410896l5.80258022-1.5264543c3.64731754 13.8647142 17.89443541 22.17719655 31.75914961 18.529879l1.5264543 5.80258023C23.07664892 67.43614731 5.54195825 57.2055303 1.05290547 40.1410896z"></path>
    </svg>
);

export const XmarkIcon: React.FC<IconsType> = ({ width, height, className, style, onClick }) => (
    <svg
        focusable="false"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 19 19"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        onClick={onClick}
    >
        <path
            d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z"
            fill="currentColor"
            fillRule="evenodd"
        ></path>
    </svg>
);

export const BarsIcon: React.FC<IconsType> = ({ width, height, className, style, onClick }) => (
    <svg
        focusable="false"
        height={height}
        width={width}
        style={style}
        className={className}
        onClick={onClick}
        viewBox="0 0 20 16"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
    >
        <path d="M0 14h20v2H0v-2zM0 0h20v2H0V0zm0 7h20v2H0V7z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
);

export const ChervonRight: React.FC<IconsType> = ({ width = '8px', height = '12px', className, style }) => (
    <svg
        focusable="false"
        className={className}
        viewBox="0 0 8 12"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        style={style}
    >
        <path stroke="currentColor" strokeWidth="2" d="M2 2l4 4-4 4" fill="none" strokeLinecap="square"></path>
    </svg>
);

export const ChervonLeft: React.FC<IconsType> = ({ width = '8px', height = '12px', className, style }) => (
    <svg
        width={width}
        height={height}
        style={style}
        viewBox="0 0 8 12"
        focusable="false"
        className={className}
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path stroke="currentColor" strokeWidth="2" d="M6 10L2 6l4-4" fill="none" strokeLinecap="square"></path>
    </svg>
);

export const PhoneIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg
        focusable="false"
        className={className}
        viewBox="0 0 24 24"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        style={style}
    >
        <g strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square">
            <path d="M17 15l-3 3-8-8 3-3-5-5-3 3c0 9.941 8.059 18 18 18l3-3-5-5z" stroke="#030303"></path>
            <path d="M14 1c4.971 0 9 4.029 9 9m-9-5c2.761 0 5 2.239 5 5" stroke="#030303"></path>
        </g>
    </svg>
);

export const MailTextIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg
        focusable="false"
        className={className}
        viewBox="0 0 22 22"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        style={style}
    >
        <g fill="none" fillRule="evenodd">
            <path
                stroke="#030303"
                d="M.916667 10.08333367l3.66666667-2.65833334v4.65849997zm20.1666667 0L17.416667 7.42500033v4.65849997z"
            ></path>
            <path
                stroke="#030303"
                strokeWidth="2"
                d="M4.58333367 7.42500033L1.05290547 10.9554285V21.0833337h20.1666667V10.9554285L17.416667 7.42500033"
            ></path>
            <path
                stroke="#030303"
                strokeWidth="2"
                d="M4.58333367 12.1000003V.916667H17.416667v11.1833333m-16.5-2.01666663L21.0833337 21.0833337m0-11.00000003L11.0000003 15.5833337"
            ></path>
            <path
                d="M8.25000033 5.50000033h5.49999997M8.25000033 9.166667h5.49999997"
                stroke="#030303"
                strokeWidth="2"
                strokeLinecap="square"
            ></path>
        </g>
    </svg>
);

export const FacebookIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg focusable="false" className={className} viewBox="0 0 30 30" width={width} height={height} style={style}>
        <path
            d="M15 30C6.71572875 30 0 23.2842712 0 15 0 6.71572875 6.71572875 0 15 0c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15zm3.2142857-17.1429611h-2.1428678v-2.1425646c0-.5852979.8203285-1.07160109 1.0714928-1.07160109h1.071375v-2.1428925h-2.1428678c-2.3564786 0-3.2142536 1.98610393-3.2142536 3.21449359v2.1425646h-1.0714822l.0032143 2.1528011 1.0682679-.0099086v7.499969h3.2142536v-7.499969h2.1428678v-2.1428925z"
            fill="currentColor"
            fillRule="evenodd"
        ></path>
    </svg>
);

export const InstaIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        focusable="false"
        className={className}
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M15 30C6.71572875 30 0 23.2842712 0 15 0 6.71572875 6.71572875 0 15 0c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15zm.0000159-23.03571429c-2.1823849 0-2.4560363.00925037-3.3131306.0483571-.8553081.03901103-1.4394529.17486384-1.9505835.37352345-.52841925.20532625-.9765517.48009406-1.42331254.926823-.44672894.44676084-.72149675.89489329-.926823 1.42331254-.19865961.5111306-.33451242 1.0952754-.37352345 1.9505835-.03910673.8570943-.0483571 1.1307457-.0483571 3.3131306 0 2.1823531.00925037 2.4560045.0483571 3.3130988.03901103.8553081.17486384 1.4394529.37352345 1.9505835.20532625.5284193.48009406.9765517.926823 1.4233125.44676084.446729.89489329.7214968 1.42331254.9268549.5111306.1986278 1.0952754.3344806 1.9505835.3734916.8570943.0391067 1.1307457.0483571 3.3131306.0483571 2.1823531 0 2.4560045-.0092504 3.3130988-.0483571.8553081-.039011 1.4394529-.1748638 1.9505835-.3734916.5284193-.2053581.9765517-.4801259 1.4233125-.9268549.446729-.4467608.7214968-.8948932.9268549-1.4233125.1986278-.5111306.3344806-1.0952754.3734916-1.9505835.0391067-.8570943.0483571-1.1307457.0483571-3.3130988 0-2.1823849-.0092504-2.4560363-.0483571-3.3131306-.039011-.8553081-.1748638-1.4394529-.3734916-1.9505835-.2053581-.52841925-.4801259-.9765517-.9268549-1.42331254-.4467608-.44672894-.8948932-.72149675-1.4233125-.926823-.5111306-.19865961-1.0952754-.33451242-1.9505835-.37352345-.8570943-.03910673-1.1307457-.0483571-3.3130988-.0483571zm0 1.44787387c2.1456068 0 2.3997686.00819774 3.2471022.04685789.7834742.03572556 1.2089592.1666342 1.4921162.27668167.3750864.14577303.6427729.31990322.9239522.60111439.2812111.28117926.4553413.54886575.6011144.92395217.1100474.283157.2409561.708642.2766816 1.4921162.0386602.8473336.0468579 1.1014954.0468579 3.247134 0 2.1456068-.0081977 2.3997686-.0468579 3.2471022-.0357255.7834742-.1666342 1.2089592-.2766816 1.4921162-.1457731.3750864-.3199033.6427729-.6011144.9239522-.2811793.2812111-.5488658.4553413-.9239522.6011144-.283157.1100474-.708642.2409561-1.4921162.2766816-.847206.0386602-1.1013359.0468579-3.2471022.0468579-2.1457981 0-2.3998961-.0081977-3.247134-.0468579-.7834742-.0357255-1.2089592-.1666342-1.4921162-.2766816-.37508642-.1457731-.64277291-.3199033-.92395217-.6011144-.28117927-.2811793-.45534136-.5488658-.60111439-.9239522-.11004747-.283157-.24095611-.708642-.27668167-1.4921162-.03866015-.8473336-.04685789-1.1014954-.04685789-3.2471022 0-2.1456386.00819774-2.3998004.04685789-3.247134.03572556-.7834742.1666342-1.2089592.27668167-1.4921162.14577303-.37508642.31990322-.64277291.60111439-.92395217.28117926-.28121117.54886575-.45534136.92395217-.60111439.283157-.11004747.708642-.24095611 1.4921162-.27668167.8473336-.03866015 1.1014954-.04685789 3.247134-.04685789zm0 9.26641182c-1.479357 0-2.6785873-1.1992303-2.6785873-2.6785555 0-1.479357 1.1992303-2.6785873 2.6785873-2.6785873 1.4793252 0 2.6785555 1.1992303 2.6785555 2.6785873 0 1.4793252-1.1992303 2.6785555-2.6785555 2.6785555zm0-6.8050167c-2.2790034 0-4.1264612 1.8474578-4.1264612 4.1264612 0 2.2789716 1.8474578 4.1264294 4.1264612 4.1264294 2.2789716 0 4.1264294-1.8474578 4.1264294-4.1264294 0-2.2790034-1.8474578-4.1264612-4.1264294-4.1264612zm5.2537621-.1630297c0-.532566-.431737-.96430298-.964303-.96430298-.532534 0-.964271.43173698-.964271.96430298 0 .5325659.431737.964271.964271.964271.532566 0 .964303-.4317051.964303-.964271z"
        ></path>
    </svg>
);

export const PrinterestIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg focusable="false" className={className} viewBox="0 0 30 30" width={width} height={height} style={style}>
        <path
            d="M15 30C6.71572875 30 0 23.2842712 0 15 0 6.71572875 6.71572875 0 15 0c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15zm-.4492946-22.49876954c-.3287968.04238918-.6577148.08477836-.9865116.12714793-.619603.15784625-1.2950238.30765013-1.7959124.60980792-1.3367356.80672832-2.26284291 1.74754848-2.88355361 3.27881599-.1001431.247352-.10374313.4870343-.17702448.7625149-.47574032 1.7840923.36779138 3.6310327 1.39120339 4.2696951.1968419.1231267.6448551.3405257.8093833.0511377.0909873-.1603963.0706852-.3734014.1265202-.5593764.036883-.1231267.1532436-.3547666.1263818-.508219-.0455542-.260514-.316041-.4256572-.4299438-.635367-.230748-.4253041-.2421365-.8027267-.3541701-1.3723228.0084116-.0763633.0168405-.1527266.0253733-.2290899.0340445-.6372108.1384107-1.0968422.3287968-1.5502554.5593198-1.3317775 1.4578212-2.07273488 2.9088231-2.5163011.324591-.09899963 1.2400541-.25867013 1.7200175-.1523539.2867042.05078464.5734084.10156927.8600087.1523539 1.0390064.33760307 1.7953931.9602003 2.2007079 1.9316992.252902.6061594.3275507 1.7651044.1517724 2.5415071-.0833199.3679287-.0705641.6832289-.1770418 1.0168107-.3936666 1.2334841-.9709174 2.3763639-2.2765854 2.6942337-.8613761.2093567-1.5070793-.3321303-1.7200175-.8896824-.0589159-.1545509-.1598205-.4285603-.1011297-.6865243.2277711-1.0010987.5562045-1.8969797.8093661-2.8969995.24115-.9528838-.2166421-1.7048063-.9358863-1.8809146-.8949186-.2192233-1.585328.6350139-1.8211644 1.1943903-.1872881.4442919-.3005678 1.2641823-.1517724 1.8557085.0471811.1874265.2666617.689447.2276672.8640842-.1728187.7731269-.3685356 1.6039823-.5818373 2.3635745-.2219729.7906632-.3415527 1.5999416-.5564641 2.3639276-.098793.3507651-.0955738.7263439-.1770244 1.092821v.5337977c-.0739045.3379758-.0194367.9375444.0505042 1.2703809.0449484.2137505-.0261175.4786388.0758948.6357396.0020943.1140055.0159752.1388388.0506254.2031582.3168026-.0095136.7526829-.8673992.9106342-1.118027.3008274-.477913.5797431-.990879.8093833-1.5506281.2069844-.5042174.2391769-1.0621226.4046917-1.60104.1195798-.3894861.2889369-.843272.328918-1.2707535h.0252521c.065614.2342095.3033024.403727.4805692.5334446.5563429.4077482 1.5137774.7873678 2.5547742.5337977 1.1769151-.2868184 2.1141687-.8571599 2.7317812-1.702982.4549537-.6225776.7983583-1.3445472 1.0624066-2.1600633.1297394-.4011574.156982-.8454494.2529193-1.2711066.2405269-1.0661438-.0797199-2.3511383-.3794396-3.0497261-.9078995-2.11694836-2.8374975-3.32410832-5.918897-3.27881604z"
            fill="currentColor"
            fillRule="evenodd"
        ></path>
    </svg>
);

export const YoutubeIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg focusable="false" className={className} viewBox="0 0 30 30" width={width} height={height} style={style}>
        <path
            d="M15 30c8.2842712 0 15-6.7157288 15-15 0-8.28427125-6.7157288-15-15-15C6.71572875 0 0 6.71572875 0 15c0 8.2842712 6.71572875 15 15 15zm7.6656364-18.7823145C23 12.443121 23 15 23 15s0 2.5567903-.3343636 3.7824032c-.184.6760565-.7260909 1.208492-1.4145455 1.3892823C20.0033636 20.5 15 20.5 15 20.5s-5.00336364 0-6.25109091-.3283145c-.68836364-.1807903-1.23054545-.7132258-1.41454545-1.3892823C7 17.5567903 7 15 7 15s0-2.556879.33436364-3.7823145c.184-.6761452.72618181-1.2085807 1.41454545-1.38928227C9.99663636 9.5 15 9.5 15 9.5s5.0033636 0 6.2510909.32840323c.6884546.18070157 1.2305455.71313707 1.4145455 1.38928227zm-9.302 6.103758l4.1818181-2.3213548-4.1818181-2.3215322v4.642887z"
            fill="currentColor"
            fillRule="evenodd"
        ></path>
    </svg>
);

export const MessageIcon: React.FC<IconsType> = ({ width, height, className, style }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        role="img"
        aria-label="Bubble icon button"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
    >
        <filter id="33c9df204aeec9aa096f1fd360bd4160">
            <feGaussianBlur stdDeviation="0,4" in="SourceAlpha"></feGaussianBlur>
            <feOffset dx="0" dy="4" result="offsetblur"></feOffset>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.4"></feFuncA>
            </feComponentTransfer>
            <feComposite operator="in" in2="offsetblur"></feComposite>
            <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
        <path
            fill="#161616"
            filter="url(#33c9df204aeec9aa096f1fd360bd4160)"
            d="M50,0C22.4,0,0,22.4,0,50s22.4,50,50,50h30.8l0-10.6C92.5,80.2,100,66,100,50C100,22.4,77.6,0,50,0z M32,54.5 c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5C36.5,52.5,34.5,54.5,32,54.5z M50,54.5c-2.5,0-4.5-2-4.5-4.5 c0-2.5,2-4.5,4.5-4.5c2.5,0,4.5,2,4.5,4.5C54.5,52.5,52.5,54.5,50,54.5z M68,54.5c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5 s4.5,2,4.5,4.5C72.5,52.5,70.5,54.5,68,54.5z"
        ></path>
    </svg>
);

export const FacebookLoginIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width={width}
        height={height}
        viewBox="0 0 256 256"
        xmlSpace="preserve"
        className={className}
        style={style}
    >
        <defs></defs>
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path
                d="M 85.033 90 C 87.776 90 90 87.776 90 85.033 V 4.967 C 90 2.223 87.776 0 85.033 0 H 4.967 C 2.223 0 0 2.223 0 4.967 v 80.066 C 0 87.776 2.223 90 4.967 90 H 85.033 z"
                fill="rgb(60,90,153)"
            />
            <path
                d="M 50.916 83.204 V 48.351 h 11.699 l 1.752 -13.583 h -13.45 v -8.672 c 0 -3.933 1.092 -6.612 6.731 -6.612 l 7.193 -0.003 V 7.332 c -1.244 -0.166 -5.513 -0.535 -10.481 -0.535 c -10.37 0 -17.47 6.33 -17.47 17.954 v 10.017 H 25.16 v 13.583 h 11.729 v 34.853 H 50.916 z"
                fill="rgb(255,255,255)"
            />
        </g>
    </svg>
);

export const GoogleLoginIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width={width}
        height={height}
        className={className}
        style={style}
    >
        <rect fill="#D95032" width="128" height="128" />
        <g>
            <path
                d="M49.211,70.991h16.883c-1.94,7.84-7.912,12.213-17.035,12.213c-10.781,0-19.554-8.616-19.554-19.203    c0-10.589,8.773-19.205,19.554-19.205c4.716,0,9.269,1.671,12.821,4.707l8.117-9.162c-5.803-4.958-13.239-7.689-20.937-7.689    c-17.6,0-31.917,14.063-31.917,31.348c0,17.284,14.317,31.347,31.917,31.347c17.995,0,30.083-12.23,30.083-30.428v-6.073H49.211    V70.991z"
                fill="#FFFFFF"
            />
            <polygon
                fill="#FFFFFF"
                points="117.143,58.741 106.143,58.741 106.143,47.741 98.143,47.741 98.143,58.741 87.143,58.741     87.143,66.741 98.143,66.741 98.143,77.741 106.143,77.741 106.143,66.741 117.143,66.741   "
            />
        </g>
    </svg>
);

export const DecreaseIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
    <svg
        focusable="false"
        width={width}
        height={height}
        viewBox="0 0 10 2"
        role="presentation"
        className={className}
        style={style}
    >
        <path d="M10 0v2H0V0z" fill="currentColor"></path>
    </svg>
);

export const IncreaseIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
    <svg
        focusable="false"
        width={width}
        height={height}
        viewBox="0 0 10 10"
        role="presentation"
        className={className}
        style={style}
    >
        <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
);
