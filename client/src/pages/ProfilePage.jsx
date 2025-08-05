import React from "react";

const ProfilePage = () => {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="flex gap-4 flex-col items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQTxqvEAt3F5h3jE6U_FUQlsemOUmREyKow_77ai8sDeqnWBw4gS-RKDHzMHsuiy53QdLXd_SKX5Y-zZfwGmjBqmsZuQu6HSwldj55kxGw75wBO7YPtx51_-Epve0BuweC1w1_EzLvWbomFn7_8UdfAuulqp06rLr_WU_tu6jOoPp915xb2MZJCAfS07i-qsYqimUiphfusgZHQUTzOpmmsGfXW_FL2vd8Qe3T8LXs6EOUrC2l6J6txcY-u40uIZi3JoNYDOAxhpc")`,
              }}
            ></div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                Sophia Bennett
              </p>
              <p className="text-[#9bbfa9] text-base font-normal leading-normal text-center">
                Joined 2022
              </p>
              <p className="text-[#9bbfa9] text-base font-normal leading-normal text-center">
                Learning English
              </p>
            </div>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2a4133] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto">
            <span className="truncate">Save Profile</span>
          </button>
        </div>
      </div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Edit Profile
      </h2>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            User Name
          </p>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c5d49] bg-[#1e2f24] focus:border-[#3c5d49] h-14 placeholder:text-[#9bbfa9] p-[15px] text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            New Password
          </p>
          <input
            placeholder="Enter new password"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c5d49] bg-[#1e2f24] focus:border-[#3c5d49] h-14 placeholder:text-[#9bbfa9] p-[15px] text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Confirm Password
          </p>
          <input
            placeholder="Confirm new password"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c5d49] bg-[#1e2f24] focus:border-[#3c5d49] h-14 placeholder:text-[#9bbfa9] p-[15px] text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Learning Stats
      </h2>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3c5d49]">
          <p className="text-white text-base font-medium leading-normal">
            Words Learned
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            350
          </p>
        </div>
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3c5d49]">
          <p className="text-white text-base font-medium leading-normal">
            Words Reviewed
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            120
          </p>
        </div>
      </div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Learning Progress
      </h2>
      <div className="flex flex-wrap gap-4 px-4 py-6">
        <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#3c5d49] p-6">
          <p className="text-white text-base font-medium leading-normal">
            Words Learned Over Time
          </p>
          <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
            350
          </p>
          <div className="flex gap-1">
            <p className="text-[#9bbfa9] text-base font-normal leading-normal">
              Last 30 Days
            </p>
            <p className="text-[#0bda43] text-base font-medium leading-normal">
              +15%
            </p>
          </div>
          <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
            <svg
              width="100%"
              height="148"
              viewBox="-3 0 478 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                fill="url(#paint0_linear_1131_5935)"
              ></path>
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                stroke="#9bbfa9"
                stroke-width="3"
                stroke-linecap="round"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_1131_5935"
                  x1="236"
                  y1="1"
                  x2="236"
                  y2="149"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2a4133"></stop>
                  <stop offset="1" stop-color="#2a4133" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-around">
              <p className="text-[#9bbfa9] text-[13px] font-bold leading-normal tracking-[0.015em]">
                Week 1
              </p>
              <p className="text-[#9bbfa9] text-[13px] font-bold leading-normal tracking-[0.015em]">
                Week 2
              </p>
              <p className="text-[#9bbfa9] text-[13px] font-bold leading-normal tracking-[0.015em]">
                Week 3
              </p>
              <p className="text-[#9bbfa9] text-[13px] font-bold leading-normal tracking-[0.015em]">
                Week 4
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Settings
      </h2>
      <div className="flex items-center gap-4 bg-[#141f18] px-4 min-h-14 justify-between">
        <p className="text-white text-base font-normal leading-normal flex-1 truncate">
          Account Settings
        </p>
        <div className="shrink-0">
          <div
            className="text-white flex size-7 items-center justify-center"
            data-icon="ArrowRight"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-[#141f18] px-4 min-h-14 justify-between">
        <p className="text-white text-base font-normal leading-normal flex-1 truncate">
          Notifications
        </p>
        <div className="shrink-0">
          <div
            className="text-white flex size-7 items-center justify-center"
            data-icon="ArrowRight"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-[#141f18] px-4 min-h-14 justify-between">
        <p className="text-white text-base font-normal leading-normal flex-1 truncate">
          Logout
        </p>
        <div className="shrink-0">
          <div
            className="text-white flex size-7 items-center justify-center"
            data-icon="ArrowRight"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
