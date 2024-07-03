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

export const CheckIcon: React.FC<IconsType> = ({ width = 20, height = 20, className = '', onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width={width}
        height={height}
        className={className}
        onClick={onClick}
        style={{ backgroundColor: 'transparent' }} // Thêm màu nền vào style của SVG
    >
        <path
            fill="#ffffff"
            d="M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.436.436 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"
        />
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

export const XmarkIcon: React.FC<IconsType> = ({ width = '18px', height = '18px', className, style, onClick }) => (
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

export const FacebookIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
    <svg focusable="false" className={className} viewBox="0 0 30 30" width={width} height={height} style={style}>
        <path
            d="M15 30C6.71572875 30 0 23.2842712 0 15 0 6.71572875 6.71572875 0 15 0c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15zm3.2142857-17.1429611h-2.1428678v-2.1425646c0-.5852979.8203285-1.07160109 1.0714928-1.07160109h1.071375v-2.1428925h-2.1428678c-2.3564786 0-3.2142536 1.98610393-3.2142536 3.21449359v2.1425646h-1.0714822l.0032143 2.1528011 1.0682679-.0099086v7.499969h3.2142536v-7.499969h2.1428678v-2.1428925z"
            fill="currentColor"
            fillRule="evenodd"
        ></path>
    </svg>
);

export const InstaIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
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

export const PrinterestIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
    <svg focusable="false" className={className} viewBox="0 0 30 30" width={width} height={height} style={style}>
        <path
            d="M15 30C6.71572875 30 0 23.2842712 0 15 0 6.71572875 6.71572875 0 15 0c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15zm-.4492946-22.49876954c-.3287968.04238918-.6577148.08477836-.9865116.12714793-.619603.15784625-1.2950238.30765013-1.7959124.60980792-1.3367356.80672832-2.26284291 1.74754848-2.88355361 3.27881599-.1001431.247352-.10374313.4870343-.17702448.7625149-.47574032 1.7840923.36779138 3.6310327 1.39120339 4.2696951.1968419.1231267.6448551.3405257.8093833.0511377.0909873-.1603963.0706852-.3734014.1265202-.5593764.036883-.1231267.1532436-.3547666.1263818-.508219-.0455542-.260514-.316041-.4256572-.4299438-.635367-.230748-.4253041-.2421365-.8027267-.3541701-1.3723228.0084116-.0763633.0168405-.1527266.0253733-.2290899.0340445-.6372108.1384107-1.0968422.3287968-1.5502554.5593198-1.3317775 1.4578212-2.07273488 2.9088231-2.5163011.324591-.09899963 1.2400541-.25867013 1.7200175-.1523539.2867042.05078464.5734084.10156927.8600087.1523539 1.0390064.33760307 1.7953931.9602003 2.2007079 1.9316992.252902.6061594.3275507 1.7651044.1517724 2.5415071-.0833199.3679287-.0705641.6832289-.1770418 1.0168107-.3936666 1.2334841-.9709174 2.3763639-2.2765854 2.6942337-.8613761.2093567-1.5070793-.3321303-1.7200175-.8896824-.0589159-.1545509-.1598205-.4285603-.1011297-.6865243.2277711-1.0010987.5562045-1.8969797.8093661-2.8969995.24115-.9528838-.2166421-1.7048063-.9358863-1.8809146-.8949186-.2192233-1.585328.6350139-1.8211644 1.1943903-.1872881.4442919-.3005678 1.2641823-.1517724 1.8557085.0471811.1874265.2666617.689447.2276672.8640842-.1728187.7731269-.3685356 1.6039823-.5818373 2.3635745-.2219729.7906632-.3415527 1.5999416-.5564641 2.3639276-.098793.3507651-.0955738.7263439-.1770244 1.092821v.5337977c-.0739045.3379758-.0194367.9375444.0505042 1.2703809.0449484.2137505-.0261175.4786388.0758948.6357396.0020943.1140055.0159752.1388388.0506254.2031582.3168026-.0095136.7526829-.8673992.9106342-1.118027.3008274-.477913.5797431-.990879.8093833-1.5506281.2069844-.5042174.2391769-1.0621226.4046917-1.60104.1195798-.3894861.2889369-.843272.328918-1.2707535h.0252521c.065614.2342095.3033024.403727.4805692.5334446.5563429.4077482 1.5137774.7873678 2.5547742.5337977 1.1769151-.2868184 2.1141687-.8571599 2.7317812-1.702982.4549537-.6225776.7983583-1.3445472 1.0624066-2.1600633.1297394-.4011574.156982-.8454494.2529193-1.2711066.2405269-1.0661438-.0797199-2.3511383-.3794396-3.0497261-.9078995-2.11694836-2.8374975-3.32410832-5.918897-3.27881604z"
            fill="currentColor"
            fillRule="evenodd"
        ></path>
    </svg>
);

export const YoutubeIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
    <svg focusable="false" className={className} viewBox="0 0 30 30" width={width} height={height} style={style}>
        <path
            d="M15 30c8.2842712 0 15-6.7157288 15-15 0-8.28427125-6.7157288-15-15-15C6.71572875 0 0 6.71572875 0 15c0 8.2842712 6.71572875 15 15 15zm7.6656364-18.7823145C23 12.443121 23 15 23 15s0 2.5567903-.3343636 3.7824032c-.184.6760565-.7260909 1.208492-1.4145455 1.3892823C20.0033636 20.5 15 20.5 15 20.5s-5.00336364 0-6.25109091-.3283145c-.68836364-.1807903-1.23054545-.7132258-1.41454545-1.3892823C7 17.5567903 7 15 7 15s0-2.556879.33436364-3.7823145c.184-.6761452.72618181-1.2085807 1.41454545-1.38928227C9.99663636 9.5 15 9.5 15 9.5s5.0033636 0 6.2510909.32840323c.6884546.18070157 1.2305455.71313707 1.4145455 1.38928227zm-9.302 6.103758l4.1818181-2.3213548-4.1818181-2.3215322v4.642887z"
            fill="currentColor"
            fillRule="evenodd"
        ></path>
    </svg>
);

export const MessageIcon: React.FC<IconsType> = ({ width = '28px', height = '28px', className, style }) => (
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

export const ATMPayment: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="pi-american_express"
        viewBox="0 0 38 24"
        width={width}
        height={height}
    >
        <title id="pi-american_express">American Express</title>
        <path
            fill="#000"
            d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
            opacity=".07"
        ></path>
        <path fill="#006FCF" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"></path>
        <path
            fill="#FFF"
            d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"
        ></path>
        <path
            fill="#006FCF"
            d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"
        ></path>
        <path
            fill="#006FCF"
            d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"
        ></path>
        <path
            fill="#FFF"
            d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"
        ></path>
        <path
            fill="#006FCF"
            d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"
        ></path>
        <path
            fill="#006FCF"
            d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"
        ></path>
    </svg>
);

export const ApplePayment: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        x="0"
        y="0"
        width={width}
        height={height}
        viewBox="0 0 165.521 105.965"
        xmlSpace="preserve"
        aria-labelledby="pi-apple_pay"
    >
        <title id="pi-apple_pay">Apple Pay</title>
        <path
            fill="#000"
            d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"
        ></path>
        <path
            fill="#FFF"
            d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"
        ></path>
        <g>
            <g>
                <path
                    fill="#000"
                    d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"
                ></path>
                <path
                    fill="#000"
                    d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"
                ></path>
            </g>
            <g>
                <path
                    fill="#000"
                    d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"
                ></path>
                <path
                    fill="#000"
                    d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"
                ></path>
                <path
                    fill="#000"
                    d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"
                ></path>
            </g>
        </g>
    </svg>
);

export const DiscoverPayment: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        viewBox="0 0 38 24"
        width={width}
        height={height}
        role="img"
        aria-labelledby="pi-discover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title id="pi-discover">Discover</title>
        <path
            fill="#000"
            opacity=".07"
            d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
        ></path>
        <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z" fill="#fff"></path>
        <path
            d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
            fill="#231F20"
        ></path>
        <path d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="url(#pi-paint0_linear)"></path>
        <path
            opacity=".65"
            d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
            fill="url(#pi-paint1_linear)"
        ></path>
        <path
            d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
            fill="#231F20"
        ></path>
        <path
            d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
            fill="#231F20"
        ></path>
        <path d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z" fill="#F48120"></path>
        <defs>
            <linearGradient
                id="pi-paint0_linear"
                x1="21.657"
                y1="12.275"
                x2="19.632"
                y2="9.104"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#F89F20"></stop>
                <stop offset=".25" stop-color="#F79A20"></stop>
                <stop offset=".533" stop-color="#F68D20"></stop>
                <stop offset=".62" stop-color="#F58720"></stop>
                <stop offset=".723" stop-color="#F48120"></stop>
                <stop offset="1" stop-color="#F37521"></stop>
            </linearGradient>
            <linearGradient
                id="pi-paint1_linear"
                x1="21.338"
                y1="12.232"
                x2="18.378"
                y2="6.446"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#F58720"></stop>
                <stop offset=".359" stop-color="#E16F27"></stop>
                <stop offset=".703" stop-color="#D4602C"></stop>
                <stop offset=".982" stop-color="#D05B2E"></stop>
            </linearGradient>
        </defs>
    </svg>
);

export const MasterPayment: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        viewBox="0 0 38 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        width={width}
        height={height}
        aria-labelledby="pi-master"
    >
        <title id="pi-master">Mastercard</title>
        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
        <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
        <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
        <path
            fill="#FF5F00"
            d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
        ></path>
    </svg>
);

export const VisaPayment: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        viewBox="0 0 38 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        width={width}
        height={height}
        aria-labelledby="pi-visa"
    >
        <title id="pi-visa">Visa</title>
        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
        <path
            d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
            fill="#142688"
        ></path>
    </svg>
);

export const DividerSymbol: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        viewBox="0 0 40 16"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        width={width}
        height={height}
        aria-labelledby="divider-symbol"
    >
        <title id="divider-symbol">Divider Symbol</title>
        <g stroke="currentColor" strokeWidth="2">
            <path d="M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z"></path>
            <path d="M27 8C27 11.866 23.866 15 20 15C16.134 15 13 11.866 13 8C13 4.13401 16.134 1 20 1C23.866 1 27 4.13401 27 8Z"></path>
            <path d="M39 8C39 9.65685 37.6569 11 36 11C34.3431 11 33 9.65685 33 8C33 6.34315 34.3431 5 36 5C37.6569 5 39 6.34315 39 8Z"></path>
        </g>
    </svg>
);
export const MessageChat: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Bubble icon button"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
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
            filter="#33c9df204aeec9aa096f1fd360bd4160"
            d="M50,0C22.4,0,0,22.4,0,50s22.4,50,50,50h30.8l0-10.6C92.5,80.2,100,66,100,50C100,22.4,77.6,0,50,0z M32,54.5 c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5C36.5,52.5,34.5,54.5,32,54.5z M50,54.5c-2.5,0-4.5-2-4.5-4.5 c0-2.5,2-4.5,4.5-4.5c2.5,0,4.5,2,4.5,4.5C54.5,52.5,52.5,54.5,50,54.5z M68,54.5c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5 s4.5,2,4.5,4.5C72.5,52.5,70.5,54.5,68,54.5z"
        ></path>
    </svg>
);

export const MessageChatXmark: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg
        className={className}
        style={style}
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        width={width}
        height={height}
    >
        <path
            d="M21.35 6.66166C20.895 6.20666 20.16 6.20666 19.705 6.66166L14 12.355L8.295 6.65C7.84 6.195 7.105 6.195 6.65 6.65C6.195 7.105 6.195 7.84 6.65 8.295L12.355 14L6.65 19.705C6.195 20.16 6.195 20.895 6.65 21.35C7.105 21.805 7.84 21.805 8.295 21.35L14 15.645L19.705 21.35C20.16 21.805 20.895 21.805 21.35 21.35C21.805 20.895 21.805 20.16 21.35 19.705L15.645 14L21.35 8.295C21.7933 7.85166 21.7933 7.105 21.35 6.66166Z"
            fill="#161616"
        ></path>
    </svg>
);

export const ChervonMenu: React.FC<IconsType> = ({ width = '36px', height = '22px', className, style }) => (
    <svg className={className} style={style} viewBox="0 0 20 9" role="presentation" width={width} height={height}>
        <path
            d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
            fill="#ffffff"
        ></path>
    </svg>
);
