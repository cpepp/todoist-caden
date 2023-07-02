<template lang="pug">
.navbar
    .leftButtons
        button(title="메뉴 열기")
            img(src="@/assets/menuicon.svg")
        button(title="홈으로 이동")
            img(src="@/assets/homeicon.svg")
        .searchbar
            img(class="searchicon" src="@/assets/searchicon.svg")
            input(class="search" placeholder="검색")
    .rightButtons
        button(title="작업 추가")
            img(src="@/assets/addicon.svg")
        button(class="graphButton" title="생산성 열기")
            img(src="@/assets/graphicon.svg")
            span(class="graphText") 0/5
        button(title="도움말 및 정보 열기")
            img(src="@/assets/infoicon.svg")
        button(title="알림 열기")
            img(src="@/assets/bellicon.svg")
        button(class="profileButton" title="프로필 사진 메뉴 열기")
</template>

<style scoped lang="less">
.navbar {
  box-sizing: border-box;
  flex-shrink: 0;
  height: 44px;
  z-index: 200;
  padding-left: 18px;
  padding-right: 18px;
  background-color: var(--todoist-orange);
  display: flex;
  position: static;
  justify-content: space-between;
  width: 100%;
}

.graphText {
  color: white;
  margin-left: 5px;
}

button {
  background-color: var(--todoist-orange);
  height: 28px;
  min-width: 28px;
  border-radius: 3px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;

  &:hover {
    background-color: var(--todoist-soft-orange);
  }
}

.graphButton {
  margin-left: 12px;
}

.leftButtons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.searchbar {
  display: flex;
  width: 100%;
  border: 1px solid var(--todoist-soft-orange);
  background-color: var(--todoist-soft-orange);
}

.search {
  outline: none;
  border: none;
  background-color: var(--todoist-soft-orange);
  width: 218px !important;
  color: white;

  &:focus {
    background-color: white;
    color: grey;
    width: 450px !important;
  }

  &:hover {
    background-color: white;
    color: grey;
  }
}

.rightButtons {
  display: flex;
  align-items: center;
}

.profileButton {
  background-color: white;
  border-radius: 50%;
  height: 32px;
  width: 32px;
}
</style>
