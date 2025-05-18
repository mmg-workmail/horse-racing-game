<template>
  <div class="flex flex-col gap-3 h-full">
    <div class="">
      <ScreensGameControls />
    </div>
    <div class="grid grid-cols-12 gap-3 grow">
        <div class="col-span-3">
            <ScreensGameHorseList />
        </div>
        <div class="col-span-6 grow">
            <ScreensGameRace />
        </div>
        <div class="col-span-3 grow">
            <ScreensGameBoards />
        </div>
    </div>
  </div>
</template>
