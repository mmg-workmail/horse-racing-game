<template>
  <div class="flex flex-col gap-3 h-full">
    <div class="">
      <ScreensGameControls />
    </div>
    <div class="grid grid-cols-12 gap-3 grow">
        <div class="lg:col-span-3 col-span-12 order-3 lg:order-1">
            <ScreensGameHorseList />
        </div>
        <div class="lg:col-span-6 col-span-12 order-1 lg:order-1">
            <ScreensGameRace />
        </div>
        <div class="lg:col-span-3 col-span-12 order-2 lg:order-1">
            <ScreensGameBoards />
        </div>
    </div>
  </div>
</template>
