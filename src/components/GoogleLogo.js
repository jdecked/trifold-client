// @flow strict
import React from 'react';

const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Google Logo</title>
    <desc>Created using Figma</desc>
    <g id="Canvas" transform="translate(-205 41)">
      <clipPath id="clip-0" clipRule="evenodd">
        <path
          d="M -472 -521L 969 -521L 969 503L -472 503L -472 -521Z"
          fill="#FFFFFF"
        />
      </clipPath>
      <g id="Sign In &#226;&#128;&#148; Shared View" clipPath="url(#clip-0)">
        <g id="Group">
          <g id="Google Auth Button">
            <g id="button bg" filter="url(#filter0_dd)">
              <use
                xlinkHref="#path0_fill"
                transform="translate(189 -53)"
                fill="url(#paint0_linear)"
              />
            </g>
            <g id="log in + logo">
              <g id="Vector">
                <use
                  xlinkHref="#path1_fill"
                  transform="translate(205 -41)"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd"
        filterUnits="userSpaceOnUse"
        x="187"
        y="-55"
        width="124"
        height="54"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0"
        />
        <feOffset dx="0" dy="2" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0"
        />
        <feOffset dx="0" dy="0" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
      <path
        id="path0_fill"
        fillRule="evenodd"
        d="M 2 0C 0.895429 0 0 0.895431 0 2L 0 46C 0 47.1046 0.895431 48 2 48L 118 48C 119.105 48 120 47.1046 120 46L 120 2C 120 0.895431 119.105 0 118 0L 2 0Z"
      />
      <path
        id="path1_fill"
        d="M 12 10.285L 12 14.4L 18.806 14.4C 18.531 16.165 16.75 19.574 12 19.574C 7.905 19.574 4.561 16.185 4.561 12C 4.561 7.815 7.906 4.426 12 4.426C 14.33 4.426 15.891 5.415 16.785 6.275L 20.039 3.137C 17.949 1.186 15.239 0 12 0C 5.365 0 -5.36442e-09 5.365 -5.36442e-09 12C -5.36442e-09 18.635 5.365 24 12 24C 18.926 24 23.52 19.131 23.52 12.274C 23.52 11.486 23.435 10.884 23.331 10.285L 12 10.285Z"
      />
    </defs>
  </svg>
);

export default GoogleLogo;
