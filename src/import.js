/* eslint-disable no-unused-vars */


import axios from 'axios'
import * as _ from 'lodash'

export const getData = async function (store) {

	//const dataRequest = await fetch("data/myData.json")
	//const data = await dataRequest.json()
  return axios.get("https://sheets.googleapis.com/v4/spreadsheets/1EHPzqW93hfskEDgqIYEA196_s3jwndAxOu3o-G5Y8WA/values/data?key=AIzaSyCD3YIWih_p7wbuo7ghxuORno1J_44eUhQ")
      .then(response => {
        const keys = response.data.values[0];
        response.data.values.shift()
        let dataMappedV3ToV4 = {
          feed: {
            entry: _.map(response.data.values, function (fEntry, fEntryIndex) {
              let returnedEntry = {}
              _.each(keys, function (fKey, fKeyIndex) {
                returnedEntry['gsx$' + fKey.split('_').join('')] = {
                  $t: fEntry[fKeyIndex]
                }
              })
              return returnedEntry
            })
          }
        }
        var newData = dataMappedV3ToV4;
        
        var allItems = []
        _.each(newData.feed.entry, function (item){

          _.each(item, function (property){
            if(property.$t === undefined) property.$t = "";
          })

            var itemObj = {
              id:item.gsx$id.$t,
              dataid:item.gsx$jour.$t+"-"+item.gsx$mois.$t+"-"+item.gsx$annee.$t+"-"+item.gsx$id.$t,
              annee:item.gsx$annee.$t,
              mois:item.gsx$mois.$t,
              jour:item.gsx$jour.$t,
              datelabel:item.gsx$datelabel.$t,
              titre:item.gsx$titre.$t,
              type:item.gsx$type.$t,
              bouton1_url:item.gsx$bouton1url.$t,
              bouton1_texte:item.gsx$bouton1texte.$t,
              bouton1_type:item.gsx$bouton1type.$t,
              bouton2_url:item.gsx$bouton2url.$t,
              bouton2_texte:item.gsx$bouton2texte.$t,
              bouton2_type:item.gsx$bouton2type.$t,
              bouton3_url:item.gsx$bouton3url.$t,
              bouton3_texte:item.gsx$bouton3texte.$t,
              bouton3_type:item.gsx$bouton3type.$t,
              bouton4_url:item.gsx$bouton4url.$t,
              bouton4_texte:item.gsx$bouton4texte.$t,
              bouton4_type:item.gsx$bouton4type.$t
            }
            allItems.push(itemObj)
        });

        allItems.sort((a, b) => {
          return parseInt(b.annee) - parseInt(a.annee);
        });

        allItems.sort((a, b) => {
          if (b.annee === a.annee) {
            return parseInt(b.mois) - parseInt(a.mois);
          }
          return parseInt(b.annee) - parseInt(a.annee);
        });

        allItems.sort((a, b) => {
          if (b.annee === a.annee && b.mois === a.mois) {
            return parseInt(b.jour) - parseInt(a.jour);
          }
          if (b.annee === a.annee) {
            return parseInt(b.mois) - parseInt(a.mois);
          }
          return parseInt(b.annee) - parseInt(a.annee);
        });

        allItems.reverse();

        allItems.forEach((item, index) => {
            item.color_theme = (index % 6) + 1;
        });

        console.log(allItems)
        store.commit('initializeData',allItems)
        store.commit("endImport",true)
        return true
      })

      
	/*
	return axios.get("https://sheets.googleapis.com/v4/spreadsheets/1EHPzqW93hfskEDgqIYEA196_s3jwndAxOu3o-G5Y8WA/values/data?key=AIzaSyCD3YIWih_p7wbuo7ghxuORno1J_44eUhQ")
      .then(response => {

        // SCRIPT DE MAPPING START
        const keys = response.data.values[0];
        response.data.values.shift()
        let dataMappedV3ToV4 = {
          feed: {
            entry: _.map(response.data.values, function (fEntry, fEntryIndex) {
              let returnedEntry = {}
              _.each(keys, function (fKey, fKeyIndex) {
                returnedEntry['gsx$' + fKey.split('_').join('')] = {
                  $t: fEntry[fKeyIndex]
                }
              })
              return returnedEntry
            })
          }
        }
        var newData = dataMappedV3ToV4;

        $store.allItems = []
        _.each(newData.feed.entry, function (item){

          _.each(item, function (property){
            if(property.$t === undefined) property.$t = "";
          })

            var itemObj = {
              id:item.gsx$id.$t,
              dataid:item.gsx$jour.$t+"-"+item.gsx$mois.$t+"-"+item.gsx$annee.$t+"-"+item.gsx$id.$t,
              annee:item.gsx$annee.$t,
              mois:item.gsx$mois.$t,
              jour:item.gsx$jour.$t,
              datelabel:item.gsx$datelabel.$t,
              titre:item.gsx$titre.$t,
              type:item.gsx$type.$t,
              bouton1_url:item.gsx$bouton1url.$t,
              bouton1_texte:item.gsx$bouton1texte.$t,
              bouton1_type:item.gsx$bouton1type.$t,
              bouton2_url:item.gsx$bouton2url.$t,
              bouton2_texte:item.gsx$bouton2texte.$t,
              bouton2_type:item.gsx$bouton2type.$t,
              bouton3_url:item.gsx$bouton3url.$t,
              bouton3_texte:item.gsx$bouton3texte.$t,
              bouton3_type:item.gsx$bouton3type.$t,
              bouton4_url:item.gsx$bouton4url.$t,
              bouton4_texte:item.gsx$bouton4texte.$t,
              bouton4_type:item.gsx$bouton4type.$t
            }
            $store.allItems.push(itemObj)
        });
        
        return true

	}) */

	//store.commit('initializeData',data)

	//store.commit("endImport",true)

	// return true
}