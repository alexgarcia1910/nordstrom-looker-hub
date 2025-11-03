application: nordstrom_looker_hub {
  label: "Nordstrom Looker Hub"
  url: "http://localhost:8080/bundle.js"
  # For production: https://your-cdn.com/bundle.js
  
  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    use_form_submit: yes
    use_embeds: yes
    core_api_methods: [
      # User & Session
      "me",
      
      # Dashboards
      "all_dashboards",
      "dashboard",
      "search_dashboards",
      "dashboard_dashboard_elements",
      
      # Looks
      "all_looks",
      "look",
      "search_looks",
      
      # Folders
      "all_folders",
      "folder",
      "folder_children",
      "search_folders",
      
      # Favorites
      "content_favorite_search",
      "create_content_favorite",
      "delete_content_favorite",
      
      # Recently Viewed
      "search_content_views",
      
      # Boards
      "all_boards",
      "board",
      "search_boards",
      "board_items",
      
      # Spaces
      "all_spaces",
      "space",
      
      # Users & Groups
      "all_users",
      "user",
      "all_groups",
      "group"
    ]
  }
}
