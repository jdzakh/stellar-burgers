import { getCoords } from "./get-coords"

export const compareCoords = (className: string) => {
  const bunTitleTopCoords = getCoords(document.querySelector('#bun'))!.top
  const sauceTitleTopCoords = getCoords(document.querySelector('#sauce'))!.top
  const mainTitleTopCoords = getCoords(document.querySelector('#main'))!.top
  const mainContainerTopCoords = getCoords(document.querySelector(`.${className}`))!.top

  const absoluteCoords = [
    {
      title: 'bun',
      value: Math.abs(mainContainerTopCoords - bunTitleTopCoords),
    },
    {
      title: 'sauce',
      value: Math.abs(mainContainerTopCoords - sauceTitleTopCoords),
    },
    {
      title: 'main',
      value: Math.abs(mainContainerTopCoords - mainTitleTopCoords)
    },
  ]

  const coordsValues = absoluteCoords.map(coord => coord.value)
  const minValue = Math.min(...coordsValues)
  const targetBlockTitle = absoluteCoords.find(coord => coord.value === minValue)!.title

  return targetBlockTitle
}