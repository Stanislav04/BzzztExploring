package com.bzztexploring.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.common.base.Optional;
import com.tomtom.online.sdk.common.location.LatLng;
import com.tomtom.online.sdk.map.ApiKeyType;
import com.tomtom.online.sdk.map.Icon;
import com.tomtom.online.sdk.map.MapFragment;
import com.tomtom.online.sdk.map.MapProperties;
import com.tomtom.online.sdk.map.Marker;
import com.tomtom.online.sdk.map.MarkerBuilder;
import com.tomtom.online.sdk.map.OnMapReadyCallback;
import com.tomtom.online.sdk.map.Route;
import com.tomtom.online.sdk.map.TomtomMap;
import com.tomtom.online.sdk.map.TomtomMapCallback;
import com.tomtom.online.sdk.routing.OnlineRoutingApi;
import com.tomtom.online.sdk.routing.RoutingApi;
import com.tomtom.online.sdk.search.OnlineSearchApi;
import com.tomtom.online.sdk.search.SearchApi;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements OnMapReadyCallback,
        TomtomMapCallback.OnMapLongClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initTomTomServices();
        initUIViews();
        setupUIViewListeners();
    }


    private TomtomMap tomtomMap;
    private SearchApi searchApi;
    private RoutingApi routingApi;
    private Route route;
    private LatLng departurePosition;
    private LatLng destinationPosition;
    private LatLng wayPointPosition;
    private Icon departureIcon;
    private Icon destinationIcon;
    Button buttonOne;

    //BuildConfig.SEARCH_API_KEY
    //searchApi = OnlineSearchApi.create(this, BuildConfig.);
    //private RoutingApi  routingApi = OnlineRoutingApi.create(this, BuildConfig.ROUTING_API_KEY);
    //private SearchApi searchApi = OnlineSearchApi.create(this, BuildConfig.SEARCH_API_KEY);

    //private Icon departureIcon = Icon.Factory.fromResources(MainActivity.this, com.tomtom.online.sdk.map.R.drawable.ic_map_route_departure);
   // private Icon destinationIcon = Icon.Factory.fromResources(MainActivity.this, com.tomtom.online.sdk.map.R.drawable.ic_map_route_destination);


    @Override
    public void onMapReady(@NonNull final TomtomMap tomtomMap) {
        this.tomtomMap = tomtomMap;
        this.tomtomMap.setMyLocationEnabled(true);
        this.tomtomMap.addOnMapLongClickListener(this);
        this.tomtomMap.getMarkerSettings().setMarkersClustering(true);
        this.buttonOne = findViewById(R.id.buttonOne);
        this.buttonOne.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), MainActivity2.class);
                startActivity(intent);
            }
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        this.tomtomMap.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }



    @Override
    public void onMapLongClick(@NonNull LatLng latLng) {}

    private void initTomTomServices() {
        Map<ApiKeyType, String> mapKeys = new HashMap<>();
        mapKeys.put(ApiKeyType.MAPS_API_KEY, BuildConfig.MAPS_API_KEY);

        MapProperties mapProperties = new MapProperties.Builder()
                .keys(mapKeys)
                .build();
        MapFragment mapFragment = MapFragment.newInstance(mapProperties);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.mapFragment, mapFragment)
                .commit();
        mapFragment.getAsyncMap(this);
    }



    private void initUIViews() {
        departureIcon = Icon.Factory.fromResources(MainActivity.this, com.tomtom.online.sdk.map.R.drawable.ic_map_route_departure);
        destinationIcon = Icon.Factory.fromResources(MainActivity.this, com.tomtom.online.sdk.map.R.drawable.ic_map_route_destination);
    }

    private void createMarkerIfNotPresent(LatLng position, Icon icon) {
        Optional<Marker> optionalMarker = tomtomMap.findMarkerByPosition(position);
        if (!optionalMarker.isPresent()) {
            tomtomMap.addMarker(new MarkerBuilder(position)
                    .icon(icon));
        }
    }
    private void setupUIViewListeners() {

    }


}
